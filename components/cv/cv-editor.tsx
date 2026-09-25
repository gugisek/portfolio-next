"use client";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import CvDocument from "./cv-document";
import { Group, ImageField, ItemList, LocalizedField, NumberField, SelectField, TextField, Thumb, Toggle } from "./cv-fields";
import {
  emptyLocalized,
  ExperienceEntry,
  ExperienceKind,
  formatDate,
  HardwareEntry,
  Lang,
  MONTHS,
  newId,
  PortfolioData,
  qrTarget,
  SkillEntry,
  sortExperiences,
  t,
} from "@lib/portfolio";

type Tab = "profile" | "experience" | "skills" | "projects" | "cv";

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profil" },
  { id: "experience", label: "Doświadczenie" },
  { id: "skills", label: "Umiejętności" },
  { id: "projects", label: "Projekty" },
  { id: "cv", label: "Ustawienia CV" },
];

const KIND_OPTIONS: { value: ExperienceKind; label: string }[] = [
  { value: "work", label: "Praca" },
  { value: "internship", label: "Praktyki" },
  { value: "education", label: "Edukacja" },
  { value: "certificate", label: "Certyfikat" },
];

const MONTH_OPTIONS = [{ value: 0, label: "—" }, ...MONTHS.pl.map((label, index) => ({ value: index + 1, label }))];

type Status = { kind: "idle" } | { kind: "saving" } | { kind: "saved"; at: Date } | { kind: "error"; message: string };

export default function CvEditor({ initialData }: { initialData: PortfolioData }) {
  const [data, setData] = useState(initialData);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initialData));
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [tab, setTab] = useState<Tab>("profile");
  const [lang, setLang] = useState<Lang>("pl");

  const dirty = useMemo(() => JSON.stringify(data) !== savedJson, [data, savedJson]);

  const patch = useCallback((fn: (draft: PortfolioData) => void) => {
    setData((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);

  const save = useCallback(async () => {
    const sent = data;
    setStatus({ kind: "saving" });
    try {
      const response = await fetch("/api/cv/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sent),
      });
      if (response.status === 401) {
        setStatus({ kind: "error", message: "Sesja wygasła – zaloguj się ponownie w nowej karcie, a potem zapisz jeszcze raz." });
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      const stored: PortfolioData = await response.json();
      // keep whatever was typed while the request was in flight
      setData((current) => ({ ...current, updatedAt: stored.updatedAt }));
      setSavedJson(JSON.stringify({ ...sent, updatedAt: stored.updatedAt }));
      setStatus({ kind: "saved", at: new Date() });
    } catch {
      setStatus({ kind: "error", message: "Nie udało się zapisać pliku na serwerze." });
    }
  }, [data]);

  // Ctrl/Cmd + S saves
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  function print() {
    // the browser uses the document title as the PDF file name
    const previous = document.title;
    document.title = `CV ${data.profile.name} ${lang.toUpperCase()}`;
    window.addEventListener("afterprint", () => (document.title = previous), { once: true });
    window.print();
  }

  async function logout() {
    if (dirty && !window.confirm("Masz niezapisane zmiany. Wylogować mimo to?")) return;
    await fetch("/api/cv/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="cv-print-reset min-h-screen bg-[#e0e0e0] text-neutral-900">
      <header className="cv-print-hide sticky top-0 z-40 border-b border-white/50 bg-[#e0e0e0]/85 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 px-[5%] py-4">
          <div className="flex items-center gap-5">
            <h1 className="font-[Lexend-bold] text-2xl uppercase leading-none text-[#3d3d3d] md:text-3xl">CV edit</h1>
            <SaveStatus status={status} dirty={dirty} updatedAt={data.updatedAt} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/pl" target="_blank" rel="noreferrer" className="hidden px-2 text-sm text-neutral-500 transition-colors hover:text-[#2e2e2e] sm:inline">
              portfolio ↗
            </a>
            <button type="button" onClick={print} className="neu-press rounded-2xl px-5 py-2.5 text-sm font-[Lexend-medium] text-[#2e2e2e]">
              PDF / drukuj
            </button>
            <button
              type="button"
              onClick={save}
              disabled={status.kind === "saving"}
              className="rounded-2xl bg-[#3d3d3d] px-6 py-2.5 text-sm font-[Lexend-medium] text-white shadow-[6px_6px_14px_rgba(0,0,0,0.18),-6px_-6px_14px_rgba(255,255,255,0.9)] transition-all hover:translate-y-[2px] hover:bg-[#2e2e2e] disabled:opacity-60"
            >
              {status.kind === "saving" ? "Zapisywanie…" : "Zapisz"}
            </button>
            <button type="button" onClick={logout} title="Wyloguj" aria-label="Wyloguj" className="about-out-sm flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-[#2e2e2e]">
              <LogoutIcon />
            </button>
          </div>
        </div>
      </header>

      <div className="cv-print-reset grid grid-cols-1 items-start gap-8 px-[5%] py-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="cv-print-hide min-w-0 space-y-6">
          <LayoutGroup id="cv-tabs">
            <div role="tablist" className="-mx-3 flex gap-3 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(item.id)}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      active ? "font-[Lexend-medium] text-[#2e2e2e]" : "about-out-sm text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="cv-tab-pill" className="about-in absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {(tab === "experience" || tab === "skills" || tab === "projects") && (
            <p className="-mt-2 px-1 text-xs text-neutral-500">
              Pigułki przy każdym elemencie decydują, gdzie jest widoczny: <b className="font-[Lexend-medium] text-[#2e2e2e]">WWW</b> – portfolio,{" "}
              <b className="font-[Lexend-medium] text-[#2e2e2e]">CV</b> – dokument. Przekreślona = ukryty w tym miejscu.
            </p>
          )}

          <div className="about-panel rounded-[2rem] p-5 sm:p-7 md:p-8">
            {tab === "profile" && <ProfileTab data={data} patch={patch} />}
            {tab === "experience" && <ExperienceTab data={data} patch={patch} />}
            {tab === "skills" && <SkillsTab data={data} patch={patch} />}
            {tab === "projects" && <ProjectsTab data={data} patch={patch} />}
            {tab === "cv" && <CvTab data={data} patch={patch} />}
          </div>
        </div>

        <Preview data={data} lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}

type TabProps = { data: PortfolioData; patch: (fn: (draft: PortfolioData) => void) => void };

function ProfileTab({ data, patch }: TabProps) {
  const { profile } = data;
  return (
    <div className="space-y-10">
      <Group title="Dane osobowe" description="Wspólne dla portfolio i CV.">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Imię i nazwisko" value={profile.name} onChange={(v) => patch((d) => void (d.profile.name = v))} />
          <NumberField label="Wiek" value={profile.age} onChange={(v) => patch((d) => void (d.profile.age = v))} hint="W CV tylko gdy włączone w ustawieniach CV." />
        </div>
        <LocalizedField label="Rola / stanowisko" value={profile.role} onChange={(v) => patch((d) => void (d.profile.role = v))} />
        <LocalizedField label="Lokalizacja" value={profile.location} onChange={(v) => patch((d) => void (d.profile.location = v))} />
        <TextField label="Link do mapy" value={profile.locationLink} onChange={(v) => patch((d) => void (d.profile.locationLink = v))} />
        <ImageField label="Zdjęcie" value={profile.photo} onChange={(v) => patch((d) => void (d.profile.photo = v))} hint="Ścieżka w katalogu public, np. img/profile.jpg" />
      </Group>

      <Group title="Kontakt">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="E-mail" type="email" value={profile.email} onChange={(v) => patch((d) => void (d.profile.email = v))} />
          <TextField label="Telefon" value={profile.phone} placeholder="tylko w CV" onChange={(v) => patch((d) => void (d.profile.phone = v))} />
          <TextField label="Strona www (portfolio)" value={profile.website} placeholder="https://" hint="Pokazywana w CV i używana w kodzie QR." onChange={(v) => patch((d) => void (d.profile.website = v))} />
          <TextField label="GitHub" value={profile.github} onChange={(v) => patch((d) => void (d.profile.github = v))} />
        </div>
      </Group>

      <Group title="Bio" description="Sekcja „Kim jestem” w portfolio. W CV jako „O mnie”, chyba że w ustawieniach CV podasz osobne podsumowanie.">
        <LocalizedField label="Bio" multiline rows={6} value={profile.bio} onChange={(v) => patch((d) => void (d.profile.bio = v))} hint="Akapity oddziel pustą linią." />
      </Group>

      <Group title="Liczby" description="Trzy kafelki pod bio w portfolio.">
        <ItemList
          items={profile.stats}
          onChange={(items) => patch((d) => void (d.profile.stats = items))}
          create={() => ({ id: newId(), value: "", label: emptyLocalized() })}
          addLabel="Dodaj liczbę"
          itemTitle={(stat) => [stat.value, stat.label.pl].filter(Boolean).join(" ")}
          render={(stat, update) => (
            <>
              <TextField label="Wartość" value={stat.value} onChange={(v) => update((s) => void (s.value = v))} />
              <LocalizedField label="Podpis" value={stat.label} onChange={(v) => update((s) => void (s.label = v))} />
            </>
          )}
        />
      </Group>

      <Group title="Social media" description="Sekcja kontakt w portfolio. Nazwa = ikona z img/buttons (instagram, facebook, github, discord).">
        <ItemList
          items={profile.socials}
          onChange={(items) => patch((d) => void (d.profile.socials = items))}
          create={() => ({ id: newId(), name: "", link: "" })}
          addLabel="Dodaj link"
          itemTitle={(social) => social.name}
          itemMeta={(social) => social.link}
          render={(social, update) => (
            <>
              <ImageField label="Nazwa" value={social.name} base="img/buttons/" onChange={(v) => update((s) => void (s.name = v))} />
              <TextField label="Link" value={social.link} onChange={(v) => update((s) => void (s.link = v))} />
            </>
          )}
        />
      </Group>
    </div>
  );
}

function ExperienceTab({ data, patch }: TabProps) {
  return (
    <Group
      title="Doświadczenie i edukacja"
      description="Oś czasu w portfolio. W CV: praca i praktyki → Doświadczenie, edukacja → Edukacja, certyfikaty → Certyfikaty."
      actions={
        <button
          type="button"
          onClick={() => patch((d) => void (d.experiences = sortExperiences(d.experiences)))}
          className="neu-press rounded-2xl px-4 py-2 text-xs font-[Lexend-medium] text-[#2e2e2e]"
        >
          Sortuj od najnowszych
        </button>
      }
    >
      <ItemList<ExperienceEntry>
        items={data.experiences}
        onChange={(items) => patch((d) => void (d.experiences = items))}
        create={() => ({
          id: newId(),
          kind: "work",
          name: emptyLocalized(),
          place: emptyLocalized(),
          description: emptyLocalized(),
          year: String(new Date().getFullYear()),
          month: new Date().getMonth() + 1,
          duration: emptyLocalized(),
          current: false,
          showOnSite: true,
          showInCv: true,
        })}
        addLabel="Dodaj wpis"
        visibility={["site", "cv"]}
        itemTitle={(item) => t(item.name, "pl")}
        itemMeta={(item) => `${item.month ? String(item.month).padStart(2, "0") + "." : ""}${item.year} · ${t(item.place, "pl")}`}
        render={(item, update) => (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <SelectField label="Typ" value={item.kind} options={KIND_OPTIONS} onChange={(v) => update((e) => void (e.kind = v))} />
              <SelectField label="Miesiąc" value={item.month} options={MONTH_OPTIONS} onChange={(v) => update((e) => void (e.month = v))} />
              <TextField label="Rok" value={item.year} onChange={(v) => update((e) => void (e.year = v))} />
            </div>
            <LocalizedField label="Nazwa" value={item.name} onChange={(v) => update((e) => void (e.name = v))} />
            <LocalizedField label="Miejsce" value={item.place} onChange={(v) => update((e) => void (e.place = v))} />
            <LocalizedField label="Opis" value={item.description} onChange={(v) => update((e) => void (e.description = v))} />
            <LocalizedField label="Czas trwania" value={item.duration} placeholder={{ en: "e.g. 2 years", pl: "np. 2 lata" }} onChange={(v) => update((e) => void (e.duration = v))} />
            <Toggle label="Trwa obecnie" hint="Zielona kropka „Teraz” w portfolio, „obecnie” w CV." checked={item.current} onChange={(v) => update((e) => void (e.current = v))} />
          </>
        )}
      />
    </Group>
  );
}

function SkillList({ items, onChange, imageHint }: { items: SkillEntry[]; onChange: (items: SkillEntry[]) => void; imageHint: string }) {
  return (
    <ItemList
      items={items}
      onChange={onChange}
      create={() => ({ id: newId(), name: "", image: "", years: 1, showOnSite: true, showInCv: true })}
      addLabel="Dodaj"
      visibility={["site", "cv"]}
      itemTitle={(item) => item.name}
      itemMeta={(item) => `${item.years} ${item.years === 1 ? "rok" : "lat(a)"}`}
      render={(item, update) => (
        <>
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_120px]">
            <TextField label="Nazwa" value={item.name} onChange={(v) => update((s) => void (s.name = v))} />
            <NumberField label="Lata" value={item.years} onChange={(v) => update((s) => void (s.years = v))} />
          </div>
          <ImageField label="Ikona" value={item.image} hint={imageHint} onChange={(v) => update((s) => void (s.image = v))} />
        </>
      )}
    />
  );
}

function SkillsTab({ data, patch }: TabProps) {
  return (
    <div className="space-y-10">
      <Group title="Języki i technologie" description="W CV jako paski umiejętności (długość = lata doświadczenia).">
        <SkillList items={data.skills} onChange={(items) => patch((d) => void (d.skills = items))} imageHint="np. img/skills/langs/react.png" />
      </Group>
      <Group title="Aplikacje" description="W CV jako „Narzędzia”.">
        <SkillList items={data.apps} onChange={(items) => patch((d) => void (d.apps = items))} imageHint="np. img/skills/programs/figma.webp" />
      </Group>
      <Group title="Sprzęt">
        <ItemList<HardwareEntry>
          items={data.hardware}
          onChange={(items) => patch((d) => void (d.hardware = items))}
          create={() => ({ id: newId(), name: emptyLocalized(), image: "", imageHover: "", experience: emptyLocalized(), showOnSite: true, showInCv: true })}
          addLabel="Dodaj"
          visibility={["site", "cv"]}
          itemTitle={(item) => t(item.name, "pl")}
          itemMeta={(item) => t(item.experience, "pl")}
          render={(item, update) => (
            <>
              <LocalizedField label="Nazwa" value={item.name} onChange={(v) => update((h) => void (h.name = v))} />
              <LocalizedField label="Poziom / zakres" value={item.experience} onChange={(v) => update((h) => void (h.experience = v))} />
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageField label="Obrazek" base="img/skills/hardware/" value={item.image} onChange={(v) => update((h) => void (h.image = v))} />
                <ImageField label="Obrazek po najechaniu" base="img/skills/hardware/" value={item.imageHover} onChange={(v) => update((h) => void (h.imageHover = v))} />
              </div>
            </>
          )}
        />
      </Group>
    </div>
  );
}

function ProjectsTab({ data, patch }: TabProps) {
  return (
    <Group title="Projekty" description="Sekcja „Moje projekty” w portfolio. W CV pokazywane jest krótkie podsumowanie.">
      <ItemList
        items={data.projects}
        onChange={(items) => patch((d) => void (d.projects = items))}
        create={() => ({
          id: newId(),
          name: emptyLocalized(),
          summary: emptyLocalized(),
          description: emptyLocalized(),
          link: "",
          github: "",
          images: [],
          technologies: emptyLocalized(),
          showOnSite: true,
          showInCv: true,
        })}
        addLabel="Dodaj projekt"
        visibility={["site", "cv"]}
        itemTitle={(project) => t(project.name, "pl")}
        itemMeta={(project) => t(project.technologies, "pl")}
        render={(project, update) => (
          <>
            <LocalizedField label="Nazwa" value={project.name} onChange={(v) => update((p) => void (p.name = v))} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Strona" value={project.link} placeholder="https://" onChange={(v) => update((p) => void (p.link = v))} />
              <TextField label="GitHub" value={project.github} placeholder="https://github.com/…" onChange={(v) => update((p) => void (p.github = v))} />
            </div>
            <LocalizedField
              label="Technologie"
              value={project.technologies}
              hint="Oddzielone spacją. Myślnik zamienia się w CV na spację, np. druk-3D."
              onChange={(v) => update((p) => void (p.technologies = v))}
            />
            <div>
              <TextField
                label="Zdjęcia"
                multiline
                rows={3}
                value={project.images.join("\n")}
                hint="Jedna nazwa pliku z img/posts w linii."
                onChange={(v) => update((p) => void (p.images = v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)))}
              />
              {project.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.images.map((image, index) => (
                    <Thumb key={`${image}-${index}`} src={`/img/posts/${image}`} />
                  ))}
                </div>
              )}
            </div>
            <LocalizedField label="Podsumowanie do CV" multiline rows={3} value={project.summary} onChange={(v) => update((p) => void (p.summary = v))} hint="Zwykły tekst, 1–2 zdania." />
            <LocalizedField label="Opis w portfolio (HTML)" multiline rows={7} mono value={project.description} onChange={(v) => update((p) => void (p.description = v))} />
          </>
        )}
      />
    </Group>
  );
}

function CvTab({ data, patch }: TabProps) {
  const { cv } = data;
  return (
    <div className="space-y-10">
      <Group title="Wygląd" description="Te ustawienia dotyczą tylko CV.">
        <div className="space-y-4">
          <Toggle label="Zdjęcie w nagłówku" checked={cv.showPhoto} onChange={(v) => patch((d) => void (d.cv.showPhoto = v))} />
          <Toggle label="Wiek obok roli" checked={cv.showAge} onChange={(v) => patch((d) => void (d.cv.showAge = v))} />
          <Toggle label="Klauzula RODO na dole" checked={cv.showClause} onChange={(v) => patch((d) => void (d.cv.showClause = v))} />
        </div>
      </Group>

      <Group title="Kod QR" description="W prawym górnym rogu CV, prowadzi do portfolio.">
        <Toggle
          label="Pokaż kod QR"
          checked={cv.showQr}
          onChange={(v) => patch((d) => void (d.cv.showQr = v))}
          hint={
            cv.showQr && !data.profile.website && !cv.qrUrl.en && !cv.qrUrl.pl
              ? "Uzupełnij „Strona www” w profilu (adres portfolio) albo link poniżej – bez adresu kod się nie pokaże."
              : undefined
          }
        />
        <LocalizedField
          label="Własny link w kodzie"
          value={cv.qrUrl}
          onChange={(v) => patch((d) => void (d.cv.qrUrl = v))}
          placeholder={{ en: qrTarget(data, "en") || "https://…", pl: qrTarget(data, "pl") || "https://…/pl" }}
          hint="Puste = „Strona www” z profilu; w polskim CV automatycznie z /pl."
        />
      </Group>

      <Group title="Podsumowanie" description="Zostaw puste, żeby w CV użyć bio z profilu.">
        <LocalizedField label="O mnie w CV" multiline rows={5} value={cv.summary} onChange={(v) => patch((d) => void (d.cv.summary = v))} hint="Akapity oddziel pustą linią." />
      </Group>

      <Group title="Języki obce">
        <ItemList
          items={cv.languages}
          onChange={(items) => patch((d) => void (d.cv.languages = items))}
          create={() => ({ id: newId(), name: emptyLocalized(), level: emptyLocalized(), showInCv: true })}
          addLabel="Dodaj język"
          visibility={["cv"]}
          itemTitle={(language) => t(language.name, "pl")}
          itemMeta={(language) => t(language.level, "pl")}
          render={(language, update) => (
            <>
              <LocalizedField label="Język" value={language.name} onChange={(v) => update((l) => void (l.name = v))} />
              <LocalizedField label="Poziom" value={language.level} placeholder={{ en: "e.g. B2", pl: "np. B2" }} onChange={(v) => update((l) => void (l.level = v))} />
            </>
          )}
        />
      </Group>

      <Group title="Zainteresowania">
        <LocalizedField label="Zainteresowania" multiline rows={2} value={cv.interests} onChange={(v) => patch((d) => void (d.cv.interests = v))} />
      </Group>

      <Group title="Klauzula">
        <LocalizedField label="Klauzula RODO" multiline rows={5} value={cv.clause} onChange={(v) => patch((d) => void (d.cv.clause = v))} />
      </Group>
    </div>
  );
}

// ---------- preview ----------

const MM = 96 / 25.4;
const PAGE_CONTENT_MM = 297 - 13 - 12; // A4 minus the repeated top / bottom spacers in CvDocument
const PAGE_TOP_MM = 13;

function Preview({ data, lang, setLang }: { data: PortfolioData; lang: Lang; setLang: (lang: Lang) => void }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [sheetHeight, setSheetHeight] = useState(297 * MM);

  useLayoutEffect(() => {
    if (!outer.current || !inner.current) return;
    const measure = () => {
      if (!outer.current || !inner.current) return;
      setScale(Math.min(1, outer.current.clientWidth / inner.current.offsetWidth));
      setSheetHeight(inner.current.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(outer.current);
    observer.observe(inner.current);
    return () => observer.disconnect();
  }, []);

  const pages = Math.max(1, Math.ceil((sheetHeight / MM - PAGE_TOP_MM - 12 - 0.5) / PAGE_CONTENT_MM));

  return (
    <aside className="cv-print-reset min-w-0 xl:sticky xl:top-[88px]">
      <div className="cv-print-hide mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="about-in inline-flex rounded-full p-1">
          {(["pl", "en"] as Lang[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLang(option)}
              className={`rounded-full px-4 py-1.5 text-xs font-[Lexend-medium] uppercase tracking-wider transition-all ${
                lang === option ? "about-out-sm text-[#2e2e2e]" : "text-neutral-500 hover:text-[#2e2e2e]"
              }`}
            >
              {option === "pl" ? "Polski" : "English"}
            </button>
          ))}
        </div>
        <span className="text-xs text-neutral-500">
          A4 · {pages} {pages === 1 ? "strona" : pages < 5 ? "strony" : "stron"}
        </span>
      </div>

      <div className="cv-print-reset about-in rounded-[2rem] p-3 sm:p-4 xl:max-h-[calc(100vh-150px)] xl:overflow-y-auto">
        <div ref={outer} className="cv-print-reset w-full overflow-hidden rounded-xl" style={{ height: sheetHeight * scale }}>
          <div ref={inner} className="cv-print-reset relative w-max origin-top-left shadow-[0_10px_40px_rgba(0,0,0,0.12)]" style={{ transform: `scale(${scale})` }}>
            <CvDocument data={data} lang={lang} />
            {Array.from({ length: pages - 1 }, (_, index) => (
              <div
                key={index}
                aria-hidden
                className="cv-print-hide pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-[#bdbdbd]"
                style={{ top: `${PAGE_TOP_MM + PAGE_CONTENT_MM * (index + 1)}mm` }}
              >
                <span className="absolute right-3 -top-6 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] text-neutral-500 shadow">
                  ~ {index + 2}. strona
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SaveStatus({ status, dirty, updatedAt }: { status: Status; dirty: boolean; updatedAt: string }) {
  let dot = "bg-emerald-500";
  let text = `zapisane · ${formatDate(updatedAt)}`;
  if (status.kind === "error") {
    dot = "bg-red-500";
    text = status.message;
  } else if (status.kind === "saving") {
    dot = "bg-neutral-400 animate-pulse";
    text = "zapisywanie…";
  } else if (dirty) {
    dot = "bg-amber-500";
    text = "niezapisane zmiany · Ctrl+S";
  } else if (status.kind === "saved") {
    text = `zapisano o ${status.at.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}`;
  }
  return (
    <span className={`inline-flex max-w-[22rem] items-center gap-2 text-xs ${status.kind === "error" ? "text-red-600" : "text-neutral-500"}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <span className="truncate" title={text}>
        {text}
      </span>
    </span>
  );
}

function LogoutIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3" />
    </svg>
  );
}
