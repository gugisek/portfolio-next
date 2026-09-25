// Server only: reads and writes data/portfolio.json (no database).
import { promises as fs } from "fs";
import path from "path";
import { normalizePortfolio, PortfolioData } from "./portfolio";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "portfolio.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");
const BACKUPS_TO_KEEP = 30;

export async function readPortfolio(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return normalizePortfolio(JSON.parse(raw));
}

// writes are queued so two saves in a row can never interleave
let queue: Promise<unknown> = Promise.resolve();

export function writePortfolio(input: unknown): Promise<PortfolioData> {
  const run = queue.then(() => write(input));
  queue = run.catch(() => undefined);
  return run;
}

async function write(input: unknown) {
  const data = normalizePortfolio(input);
  data.updatedAt = new Date().toISOString();

  await backupCurrent();

  // write to a temp file first so a crash mid-write never leaves a broken portfolio.json
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  try {
    await fs.rename(tmp, DATA_FILE);
  } catch {
    // Windows refuses the rename while another process holds the file open
    await fs.copyFile(tmp, DATA_FILE);
    await fs.unlink(tmp).catch(() => undefined);
  }
  return data;
}

async function backupCurrent() {
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await fs.copyFile(DATA_FILE, path.join(BACKUP_DIR, `portfolio-${stamp}.json`));

    const backups = (await fs.readdir(BACKUP_DIR)).filter((name) => name.endsWith(".json")).sort();
    await Promise.all(
      backups.slice(0, Math.max(0, backups.length - BACKUPS_TO_KEEP)).map((name) => fs.unlink(path.join(BACKUP_DIR, name)))
    );
  } catch {
    // a failed backup must not block saving
  }
}
