import React from "react";
import {
  asset,
  ExperienceEntry,
  formatAge,
  formatYears,
  Lang,
  paragraphs,
  PortfolioData,
  pluralPl,
  qrTarget,
  SkillEntry,
  t,
} from "@lib/portfolio";
import QrCode from "./qr-code";

const LABELS = {
  en: {
    cv: "Curriculum Vitae",
    profile: "Profile",
    experience: "Experience",
    education: "Education",
    certificates: "Certificates",
    projects: "Projects",
    skills: "Skills",
    tools: "Tools",
    hardware: "Hardware",
    languages: "Languages",
    interests: "Interests",
    present: "present",
    internship: "Internship",
    portfolio: "Portfolio",
  },
  pl: {
    cv: "Curriculum Vitae",
    profile: "O mnie",
    experience: "Doświadczenie",
    education: "Edukacja",
    certificates: "Certyfikaty",
    projects: "Projekty",
    skills: "Umiejętności",
    tools: "Narzędzia",
    hardware: "Sprzęt",
    languages: "Języki",
    interests: "Zainteresowania",
    present: "obecnie",
    internship: "Praktyki",
    portfolio: "Portfolio",
  },
};

type Props = { data: PortfolioData; lang: Lang };

/** The printable A4 CV. Pure markup, rendered both in the editor preview and when printing. */
export default function CvDocument({ data, lang }: Props) {
  const l = LABELS[lang];
  const { profile, cv } = data;

  const visible = <T extends { showInCv: boolean }>(items: T[]) => items.filter((item) => item.showInCv);
  const experiences = visible(data.experiences);
  const work = experiences.filter((e) => e.kind === "work" || e.kind === "internship");
  const education = experiences.filter((e) => e.kind === "education");
  const certificates = experiences.filter((e) => e.kind === "certificate");
  const projects = visible(data.projects);
  const skills = visible(data.skills);
  const tools = visible(data.apps);
  const hardware = visible(data.hardware);
  const languages = visible(cv.languages);
  const summary = paragraphs(t(cv.summary, lang) || t(profile.bio, lang));
  const interests = t(cv.interests, lang);
  const qrUrl = cv.showQr ? qrTarget(data, lang) : "";

  const mainSections = [
    summary.length > 0 && {
      title: l.profile,
      body: (
        <div className="space-y-[1.6mm] text-[9pt] leading-[1.55] text-[#4d4d4d] font-[Roboto-light]">
          {summary.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ),
    },
    work.length > 0 && { title: l.experience, body: <Timeline items={work} lang={lang} /> },
    education.length > 0 && { title: l.education, body: <Timeline items={education} lang={lang} /> },
    certificates.length > 0 && { title: l.certificates, body: <Timeline items={certificates} lang={lang} compact /> },
    projects.length > 0 && {
      title: l.projects,
      body: (
        <ul className="space-y-[3.2mm]">
          {projects.map((project) => (
            <li key={project.id} className="cv-avoid-break">
              <div className="flex items-baseline justify-between gap-[3mm]">
                <h3 className="font-[Lexend-medium] text-[10pt] text-[#2e2e2e]">{t(project.name, lang)}</h3>
                {(project.link || project.github) && (
                  <span className="text-[7.5pt] text-[#8a8a8a] truncate">{displayUrl(project.link || project.github)}</span>
                )}
              </div>
              {t(project.summary, lang) && (
                <p className="mt-[0.6mm] text-[8.5pt] leading-[1.45] text-[#5a5a5a]">{t(project.summary, lang)}</p>
              )}
              {t(project.technologies, lang) && (
                <ul className="mt-[1.3mm] flex flex-wrap gap-[1.2mm]">
                  {t(project.technologies, lang).split(/\s+/).filter(Boolean).map((technology) => (
                    <li key={technology} className="cv-chip rounded-full px-[2mm] py-[0.5mm] text-[6.5pt] uppercase tracking-wider text-[#656565]">
                      {technology.replace(/-/g, " ")}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ),
    },
  ].filter(Boolean) as { title: string; body: React.ReactNode }[];

  const sideSections = [
    skills.length > 0 && { title: l.skills, body: <SkillBars items={skills} lang={lang} /> },
    tools.length > 0 && {
      title: l.tools,
      body: (
        <ul className="flex flex-wrap gap-[1.3mm]">
          {tools.map((tool) => (
            <li key={tool.id} className="cv-chip rounded-full px-[2.2mm] py-[0.7mm] text-[7.5pt] text-[#4d4d4d]">
              {tool.name}
            </li>
          ))}
        </ul>
      ),
    },
    hardware.length > 0 && {
      title: l.hardware,
      body: (
        <ul className="space-y-[1.4mm]">
          {hardware.map((item) => (
            <li key={item.id} className="text-[8.5pt] leading-tight">
              <span className="font-[Lexend-medium] text-[#2e2e2e]">{t(item.name, lang)}</span>
              {t(item.experience, lang) && <span className="block text-[7.5pt] text-[#8a8a8a]">{t(item.experience, lang)}</span>}
            </li>
          ))}
        </ul>
      ),
    },
    languages.length > 0 && {
      title: l.languages,
      body: (
        <ul className="space-y-[1.2mm]">
          {languages.map((language) => (
            <li key={language.id} className="flex items-baseline justify-between gap-[2mm] text-[8.5pt]">
              <span className="font-[Lexend-medium] text-[#2e2e2e]">{t(language.name, lang)}</span>
              <span className="text-[7.5pt] text-[#8a8a8a] text-right">{t(language.level, lang)}</span>
            </li>
          ))}
        </ul>
      ),
    },
    interests && {
      title: l.interests,
      body: <p className="text-[8.5pt] leading-[1.5] text-[#5a5a5a]">{interests}</p>,
    },
  ].filter(Boolean) as { title: string; body: React.ReactNode }[];

  const contacts = [
    profile.email && { icon: <MailIcon />, text: profile.email },
    profile.phone && { icon: <PhoneIcon />, text: profile.phone },
    t(profile.location, lang) && { icon: <PinIcon />, text: t(profile.location, lang) },
    profile.website && { icon: <GlobeIcon />, text: displayUrl(profile.website) },
    profile.github && { icon: <GithubIcon />, text: displayUrl(profile.github) },
  ].filter(Boolean) as { icon: React.ReactNode; text: string }[];

  return (
    <article className="cv-sheet relative bg-white text-[#3d3d3d] font-[Lexend-light] w-[210mm] min-h-[297mm] overflow-hidden">
      {/* drawn, not typed: a text watermark would get mixed into the header by PDF parsers (ATS) */}
      {!qrUrl && <svg aria-hidden viewBox="0 0 200 100" className="absolute -top-[3mm] right-[10mm] w-[52mm] text-[#f1f1f1]" fill="none" stroke="currentColor" strokeWidth={20} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 72 26 A 34 34 0 1 0 72 74" />
        <path d="M 108 18 L 142 84 L 176 18" />
      </svg>}

      {/* thead / tfoot repeat on every printed page, giving each page the same top and bottom margin */}
      <table className="relative w-full border-collapse">
        <thead>
          <tr>
            <td className="p-0">
              <div className="h-[13mm]" />
            </td>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td className="p-0">
              <div className="h-[12mm]" />
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td className="p-0 px-[14mm] align-top">
              <header className="flex items-center gap-[7mm]">
                {cv.showPhoto && profile.photo && (
                  <div className="cv-photo shrink-0 w-[31mm] h-[31mm] rounded-full p-[1.3mm]">
                    <img src={asset(profile.photo)} alt={profile.name} className="w-full h-full rounded-full object-cover grayscale" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[7pt] uppercase tracking-[0.4em] text-[#9a9a9a]">{l.cv}</p>
                  <h1 className="mt-[1.5mm] font-[Lexend-bold] text-[27pt] leading-[1.05] text-[#2e2e2e]">{profile.name}</h1>
                  <p className="mt-[1.2mm] text-[11pt] text-[#656565]">
                    {t(profile.role, lang)}
                    {cv.showAge && profile.age > 0 && <span className="text-[#9a9a9a]"> · {formatAge(profile.age, lang)}</span>}
                  </p>
                  {contacts.length > 0 && (
                    <ul className="mt-[3.5mm] flex flex-wrap gap-x-[4.5mm] gap-y-[1.2mm] text-[8pt] text-[#4d4d4d]">
                      {contacts.map((contact) => (
                        <li key={contact.text} className="inline-flex items-center gap-[1.4mm]">
                          <span className="text-[#8a8a8a]">{contact.icon}</span>
                          {contact.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {qrUrl && (
                  <a href={qrUrl} className="cv-qr shrink-0 flex flex-col items-center rounded-[4.5mm] px-[2.6mm] pt-[2.6mm] pb-[1.8mm]">
                    <QrCode value={qrUrl} className="w-[21mm] h-[21mm]" />
                    <span className="mt-[1.4mm] text-[5.5pt] uppercase tracking-[0.3em] text-[#8a8a8a]">{l.portfolio}</span>
                  </a>
                )}
              </header>

              <div className="mt-[6mm] h-px bg-gradient-to-r from-[#3d3d3d]/25 via-[#3d3d3d]/10 to-transparent" />

              <div className="mt-[6mm] grid grid-cols-[minmax(0,1fr)_56mm] gap-[9mm] items-start">
                <div className="min-w-0 space-y-[6.5mm]">
                  {mainSections.map((section, index) => (
                    <section key={section.title}>
                      <SectionTitle number={index + 1} title={section.title} />
                      {section.body}
                    </section>
                  ))}
                </div>

                <aside className="cv-side min-w-0 rounded-[5mm] px-[5mm] py-[5.5mm] space-y-[6mm]">
                  {sideSections.map((section) => (
                    <section key={section.title} className="cv-avoid-break">
                      <h2 className="mb-[2.6mm] font-[Lexend-bold] uppercase text-[8.5pt] tracking-[0.14em] text-[#2e2e2e]">
                        {section.title}
                      </h2>
                      {section.body}
                    </section>
                  ))}
                </aside>
              </div>

              {cv.showClause && t(cv.clause, lang) && (
                <p className="cv-avoid-break mt-[8mm] text-[6.5pt] leading-[1.45] text-[#a3a3a3]">{t(cv.clause, lang)}</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

function SectionTitle({ number, title }: { number: number; title: string }) {
  return (
    <h2 className="cv-keep-with-next mb-[3mm] flex items-center gap-[2.5mm] font-[Lexend-bold] uppercase text-[10.5pt] tracking-[0.12em] text-[#2e2e2e]">
      <span className="cv-chip rounded-full px-[1.8mm] py-[0.4mm] text-[6.5pt] tracking-normal tabular-nums text-[#8a8a8a]">
        {String(number).padStart(2, "0")}
      </span>
      {title}
      <span className="h-px flex-1 bg-gradient-to-r from-[#3d3d3d]/15 to-transparent" />
    </h2>
  );
}

function Timeline({ items, lang, compact = false }: { items: ExperienceEntry[]; lang: Lang; compact?: boolean }) {
  const l = LABELS[lang];
  return (
    <ul className={`relative ${compact ? "space-y-[2.2mm]" : "space-y-[3.2mm]"}`}>
      <span aria-hidden className="absolute left-[1.15mm] top-[2mm] bottom-[2mm] w-px bg-[#dcdcdc]" />
      {items.map((item) => {
        const place = t(item.place, lang);
        const description = t(item.description, lang);
        return (
          <li key={item.id} className="cv-avoid-break relative pl-[6mm]">
            <span
              aria-hidden
              className={`absolute left-0 top-[1.4mm] w-[2.4mm] h-[2.4mm] rounded-full border-[0.45mm] border-[#3d3d3d] ${
                item.current ? "bg-[#3d3d3d]" : "bg-white"
              }`}
            />
            <div className="flex items-baseline justify-between gap-[3mm]">
              <h3 className="font-[Lexend-medium] text-[10pt] leading-snug text-[#2e2e2e]">
                {t(item.name, lang)}
                {item.kind === "internship" && (
                  <span className="cv-chip ml-[1.8mm] align-middle rounded-full px-[1.6mm] py-[0.2mm] text-[6pt] uppercase tracking-wider text-[#8a8a8a]">
                    {l.internship}
                  </span>
                )}
              </h3>
              <span className="shrink-0 text-[7.5pt] text-[#8a8a8a] tabular-nums whitespace-nowrap">{dateRange(item, lang)}</span>
            </div>
            {place && <p className="text-[8.5pt] leading-snug text-[#4d4d4d]">{place}</p>}
            {description && <p className="mt-[0.4mm] text-[8pt] leading-snug text-[#8a8a8a]">{description}</p>}
          </li>
        );
      })}
    </ul>
  );
}

function SkillBars({ items, lang }: { items: SkillEntry[]; lang: Lang }) {
  const max = Math.max(...items.map((item) => item.years), 1);
  return (
    <ul className="space-y-[2mm]">
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex items-baseline justify-between gap-[2mm] text-[8.5pt]">
            <span className="font-[Lexend-medium] text-[#2e2e2e]">{item.name}</span>
            {item.years > 0 && <span className="text-[7pt] text-[#8a8a8a] tabular-nums">{shortYears(item.years, lang)}</span>}
          </div>
          <div className="cv-track mt-[0.9mm] h-[1.4mm] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8a8a8a] to-[#3d3d3d]"
              style={{ width: `${Math.max(8, Math.round((item.years / max) * 100))}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function dateRange(item: ExperienceEntry, lang: Lang) {
  const start = item.month ? `${String(item.month).padStart(2, "0")}.${item.year}` : item.year;
  if (item.current) return `${start} – ${LABELS[lang].present}`;
  const duration = t(item.duration, lang);
  return duration ? `${start} · ${duration}` : start;
}

function shortYears(years: number, lang: Lang) {
  return lang === "pl" ? `${years} ${pluralPl(years, "rok", "lata", "lat")}` : formatYears(years, lang).replace("years", "yrs");
}

function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const iconProps = {
  width: "3mm",
  height: "3mm",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg {...iconProps} fill="currentColor" stroke="none">
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
