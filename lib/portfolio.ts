// Shared (client + server) model of the portfolio / CV data stored in data/portfolio.json.
// Everything shown in the portfolio and in the generated CV comes from this one object.

export type Lang = "en" | "pl";
export const LANGS: Lang[] = ["en", "pl"];

export type Localized = Record<Lang, string>;

export type ExperienceKind = "work" | "internship" | "education" | "certificate";
export const EXPERIENCE_KINDS: ExperienceKind[] = ["work", "internship", "education", "certificate"];

export type Stat = { id: string; value: string; label: Localized };
export type Social = { id: string; name: string; link: string };

export type ExperienceEntry = {
  id: string;
  kind: ExperienceKind;
  name: Localized;
  place: Localized;
  description: Localized;
  year: string;
  month: number; // 1-12, 0 when unknown
  duration: Localized;
  current: boolean;
  showOnSite: boolean; // visible in the portfolio
  showInCv: boolean; // visible in the CV
};

export type SkillEntry = {
  id: string;
  name: string;
  image: string;
  years: number;
  showOnSite: boolean; // visible in the portfolio
  showInCv: boolean; // visible in the CV
};

export type HardwareEntry = {
  id: string;
  name: Localized;
  image: string;
  imageHover: string;
  experience: Localized;
  showOnSite: boolean; // visible in the portfolio
  showInCv: boolean; // visible in the CV
};

export type ProjectEntry = {
  id: string;
  name: Localized;
  summary: Localized; // short plain text, used by the CV
  description: Localized; // HTML, used by the portfolio
  link: string;
  github: string;
  images: string[];
  technologies: Localized; // space separated
  showOnSite: boolean; // visible in the portfolio
  showInCv: boolean; // visible in the CV
};

export type SpokenLanguage = {
  id: string;
  name: Localized;
  level: Localized;
  showInCv: boolean;
};

export type PortfolioData = {
  updatedAt: string;
  profile: {
    name: string;
    role: Localized;
    location: Localized;
    locationLink: string;
    age: number;
    email: string;
    phone: string;
    website: string;
    github: string;
    photo: string;
    bio: Localized; // paragraphs separated by an empty line
    stats: Stat[];
    socials: Social[];
  };
  experiences: ExperienceEntry[];
  skills: SkillEntry[];
  apps: SkillEntry[];
  hardware: HardwareEntry[];
  projects: ProjectEntry[];
  cv: {
    summary: Localized; // falls back to profile.bio when empty
    languages: SpokenLanguage[];
    interests: Localized;
    clause: Localized;
    showPhoto: boolean;
    showAge: boolean;
    showClause: boolean;
    showQr: boolean;
    qrUrl: Localized; // empty = profile.website (+ /pl in the Polish CV)
  };
};

// ---------- helpers ----------

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export function emptyLocalized(): Localized {
  return { en: "", pl: "" };
}

/** Text in the requested language, falling back to the other one when it is empty. */
export function t(value: Localized, lang: Lang) {
  return value[lang] || value[lang === "en" ? "pl" : "en"] || "";
}

export function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function pluralPl(n: number, one: string, few: string, many: string) {
  if (n === 1) return one;
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14) ? few : many;
}

export function formatYears(years: number, lang: Lang) {
  if (lang === "pl") return `${years} ${pluralPl(years, "rok", "lata", "lat")}`;
  return `${years} ${years === 1 ? "year" : "years"}`;
}

export function formatAge(age: number, lang: Lang) {
  if (lang === "pl") return `${age} ${pluralPl(age, "rok", "lata", "lat")}`;
  return `${age} years old`;
}

export const MONTHS: Record<Lang, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  pl: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
};

export function monthName(month: number, lang: Lang) {
  return MONTHS[lang][month - 1] ?? "";
}

/** dd.mm.yyyy, as used in the portfolio footer. */
export function formatDate(iso: string) {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

/** Public asset path that works from any route depth. */
export function asset(path: string) {
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith("/") || path.startsWith("data:")) return path;
  return "/" + path;
}

/** Where the CV QR code points: the custom link, or the portfolio (its /pl version in the Polish CV). */
export function qrTarget(data: PortfolioData, lang: Lang) {
  const custom = data.cv.qrUrl[lang].trim();
  if (custom) return custom;
  const site = data.profile.website.trim().replace(/\/+$/, "");
  if (!site) return "";
  return lang === "pl" ? `${site}/pl` : site;
}

/** Newest first; current entries on top within the same date. */
export function sortExperiences(items: ExperienceEntry[]) {
  return [...items].sort((a, b) => {
    const byDate = Number(b.year) * 12 + b.month - (Number(a.year) * 12 + a.month);
    return byDate !== 0 ? byDate : Number(b.current) - Number(a.current);
  });
}

// ---------- portfolio view models ----------

const onSite = (item: { showOnSite: boolean }) => item.showOnSite;

/**
 * What the public portfolio page may receive. Everything passed to it ends up in the page source,
 * so items hidden on the site and CV-only data (phone, CV settings, CV summaries) are dropped here.
 */
export function sitePortfolio(data: PortfolioData): PortfolioData {
  const empty = normalizePortfolio({});
  return {
    ...data,
    profile: { ...data.profile, phone: "" },
    experiences: data.experiences.filter(onSite),
    skills: data.skills.filter(onSite),
    apps: data.apps.filter(onSite),
    hardware: data.hardware.filter(onSite),
    projects: data.projects.filter(onSite).map((project) => ({ ...project, summary: emptyLocalized() })),
    cv: empty.cv,
  };
}

export function aboutExperiences(data: PortfolioData, lang: Lang) {
  return data.experiences.filter(onSite).map((experience) => ({
    kind: experience.kind,
    name: t(experience.name, lang),
    description: t(experience.description, lang),
    place: t(experience.place, lang),
    year: experience.year,
    month: monthName(experience.month, lang),
    duration: t(experience.duration, lang),
    current: experience.current,
  }));
}

export function aboutProfile(data: PortfolioData) {
  return { name: data.profile.name, photo: asset(data.profile.photo), github: data.profile.github };
}

export function skillItems(items: SkillEntry[], lang: Lang) {
  return items.filter(onSite).map((item) => ({ name: item.name, image: item.image, experience: formatYears(item.years, lang) }));
}

export function hardwareItems(data: PortfolioData, lang: Lang) {
  return data.hardware.filter(onSite).map((item) => ({
    name: t(item.name, lang),
    image: item.image,
    image_hover: item.imageHover,
    experience: t(item.experience, lang),
  }));
}

export function projectItems(data: PortfolioData, lang: Lang) {
  return data.projects.filter(onSite).map((project) => ({
    name: t(project.name, lang),
    description: t(project.description, lang),
    link: project.link,
    github: project.github,
    images: project.images,
    technologies: t(project.technologies, lang),
  }));
}

// ---------- normalization ----------
// Coerces anything (old file versions, a request body) into a complete PortfolioData,
// so a missing field can never break the portfolio.

type Raw = any;

const str = (value: Raw, fallback = "") => (typeof value === "string" ? value : typeof value === "number" ? String(value) : fallback);
const bool = (value: Raw, fallback = false) => (typeof value === "boolean" ? value : fallback);
const num = (value: Raw, fallback = 0) => {
  const parsed = typeof value === "number" ? value : parseFloat(value);
  return isFinite(parsed) ? parsed : fallback;
};
const loc = (value: Raw): Localized =>
  typeof value === "string" ? { en: value, pl: value } : { en: str(value?.en), pl: str(value?.pl) };
const list = <T,>(value: Raw, map: (item: Raw) => T): T[] => (Array.isArray(value) ? value.map((item) => map(item ?? {})) : []);
const id = (value: Raw) => str(value) || newId();

export function normalizePortfolio(raw: Raw): PortfolioData {
  const profile = raw?.profile ?? {};
  const cv = raw?.cv ?? {};
  const skill = (item: Raw): SkillEntry => ({
    id: id(item.id),
    name: str(item.name),
    image: str(item.image),
    years: Math.max(0, Math.round(num(item.years))),
    showInCv: bool(item.showInCv, true),
    showOnSite: bool(item.showOnSite, true),
  });

  return {
    updatedAt: str(raw?.updatedAt, new Date().toISOString()),
    profile: {
      name: str(profile.name),
      role: loc(profile.role),
      location: loc(profile.location),
      locationLink: str(profile.locationLink),
      age: Math.max(0, Math.round(num(profile.age))),
      email: str(profile.email),
      phone: str(profile.phone),
      website: str(profile.website),
      github: str(profile.github),
      photo: str(profile.photo),
      bio: loc(profile.bio),
      stats: list(profile.stats, (item) => ({ id: id(item.id), value: str(item.value), label: loc(item.label) })),
      socials: list(profile.socials, (item) => ({ id: id(item.id), name: str(item.name), link: str(item.link) })),
    },
    experiences: list(raw?.experiences, (item) => ({
      id: id(item.id),
      kind: EXPERIENCE_KINDS.includes(item.kind) ? item.kind : "work",
      name: loc(item.name),
      place: loc(item.place),
      description: loc(item.description),
      year: str(item.year),
      month: Math.min(12, Math.max(0, Math.round(num(item.month)))),
      duration: loc(item.duration),
      current: bool(item.current),
      showInCv: bool(item.showInCv, true),
      showOnSite: bool(item.showOnSite, true),
    })),
    skills: list(raw?.skills, skill),
    apps: list(raw?.apps, skill),
    hardware: list(raw?.hardware, (item) => ({
      id: id(item.id),
      name: loc(item.name),
      image: str(item.image),
      imageHover: str(item.imageHover),
      experience: loc(item.experience),
      showInCv: bool(item.showInCv, true),
      showOnSite: bool(item.showOnSite, true),
    })),
    projects: list(raw?.projects, (item) => ({
      id: id(item.id),
      name: loc(item.name),
      summary: loc(item.summary),
      description: loc(item.description),
      link: str(item.link),
      github: str(item.github),
      images: list(item.images, (image) => str(image)).filter(Boolean),
      technologies: loc(item.technologies),
      showInCv: bool(item.showInCv, true),
      showOnSite: bool(item.showOnSite, true),
    })),
    cv: {
      summary: loc(cv.summary),
      languages: list(cv.languages, (item) => ({
        id: id(item.id),
        name: loc(item.name),
        level: loc(item.level),
        showInCv: bool(item.showInCv, true),
      })),
      interests: loc(cv.interests),
      clause: loc(cv.clause),
      showPhoto: bool(cv.showPhoto, true),
      showAge: bool(cv.showAge, false),
      showClause: bool(cv.showClause, true),
      showQr: bool(cv.showQr, true),
      qrUrl: loc(cv.qrUrl),
    },
  };
}
