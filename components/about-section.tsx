"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

export type ExperienceKind = "work" | "internship" | "education" | "certificate";

export type Experience = {
  kind: ExperienceKind;
  name: string;
  description: string;
  place: string;
  year: string;
  month: string;
  duration: string;
  current?: boolean;
};

export type AboutLabels = {
  eyebrow: string;
  heading: string;
  role: string;
  location: string;
  bio: string[];
  stats: { value: string; label: string }[];
  github: string;
  contact: string;
  contactHref: string;
  timelineTitle: string;
  timelineSubtitle: string;
  now: string;
  showMore: (hidden: number) => string;
  showLess: string;
  filters: Record<"all" | ExperienceKind, string>;
};

type Props = {
  id: string;
  labels: AboutLabels;
  experiences: Experience[];
};

type Filter = "all" | ExperienceKind;

const FILTER_ORDER: Filter[] = ["all", "work", "internship", "education", "certificate"];

// below the lg breakpoint the timeline is collapsed to this many entries
const COLLAPSED_LIMIT = 4;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export default function AboutSection({ id, labels, experiences }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const isDesktop = useIsDesktop();

  const counts = useMemo(() => {
    const result: Record<Filter, number> = {
      all: experiences.length,
      work: 0,
      internship: 0,
      education: 0,
      certificate: 0,
    };
    experiences.forEach((experience) => result[experience.kind]++);
    return result;
  }, [experiences]);

  const filtered = useMemo(
    () =>
      experiences.filter((experience) => filter === "all" || experience.kind === filter),
    [experiences, filter]
  );

  const collapsible = !isDesktop && filtered.length > COLLAPSED_LIMIT;
  const collapsed = collapsible && !expanded;
  const hiddenCount = collapsed ? filtered.length - COLLAPSED_LIMIT : 0;

  const groups = useMemo(() => {
    const visible = collapsed ? filtered.slice(0, COLLAPSED_LIMIT) : filtered;
    const byYear: { year: string; items: Experience[] }[] = [];
    visible.forEach((experience) => {
      const last = byYear[byYear.length - 1];
      if (last && last.year === experience.year) last.items.push(experience);
      else byYear.push({ year: experience.year, items: [experience] });
    });
    return byYear;
  }, [filtered, collapsed]);

  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  function toggleExpanded() {
    if (expanded && panelRef.current) {
      const top = panelRef.current.getBoundingClientRect().top;
      if (top < 0) panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpanded(!expanded);
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={id}
        className="relative text-neutral-900 md:px-[8%] px-[5%] py-24 md:py-32"
      >
        <motion.header
          className="max-w-7xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="about-in inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            {labels.eyebrow}
          </span>
          <h2 className="neu-text mt-5 font-[Lexend-bold] uppercase text-5xl md:text-7xl leading-none text-[#3d3d3d]">
            {labels.heading}
          </h2>
        </motion.header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* profile */}
          <motion.aside
            className="about-panel min-w-0 lg:col-span-5 lg:sticky lg:top-8 rounded-[2rem] p-7 md:p-9 lg:[@media(max-height:860px)]:p-7"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-6">
              <a
                href="https://github.com/gugisek"
                target="_blank"
                rel="noreferrer"
                className="about-out group relative shrink-0 rounded-full w-40 h-40 md:w-44 md:h-44 lg:[@media(max-height:860px)]:w-28 lg:[@media(max-height:860px)]:h-28"
                aria-label="GitHub"
              >
                <span className=" absolute rounded-full" />
                <motion.span
                  aria-hidden
                  className="absolute rounded-full bg-[conic-gradient(from_0deg,#3d3d3d,#e5e5e5,#ffffff,#8a8a8a,#3d3d3d)] opacity-70"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <img
                  src="img/profile.jpg"
                  alt="Gustaw Sołdecki"
                  className="relative w-full h-full object-cover rounded-full border-[3px] border-[#e3e3e3] grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </a>

              <div className="text-center sm:text-left lg:text-center">
                <h3 className="font-[Lexend-bold] text-3xl md:text-4xl leading-tight text-[#2e2e2e]">
                  Gustaw Sołdecki
                </h3>
                <p className="mt-1 text-neutral-600">{labels.role}</p>
                <span className="about-in mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-neutral-600">
                  <PinIcon />
                  {labels.location}
                </span>
              </div>
            </div>

            <div className="mt-7 lg:[@media(max-height:860px)]:mt-5 space-y-4 lg:[@media(max-height:860px)]:space-y-3 font-[Roboto-light] text-lg lg:[@media(max-height:860px)]:text-base leading-relaxed text-neutral-700">
              {labels.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <dl className="about-in mt-8 lg:[@media(max-height:860px)]:mt-5 grid grid-cols-3 rounded-2xl py-1">
              {labels.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`px-1.5 sm:px-2 py-3.5 text-center ${
                    index > 0 ? "border-l border-white/70" : ""
                  }`}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-[Lexend-bold] text-2xl md:text-3xl text-[#2e2e2e]">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[10px] sm:text-xs uppercase tracking-normal sm:tracking-wider text-neutral-500 leading-snug [overflow-wrap:anywhere]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 lg:[@media(max-height:860px)]:mt-6 flex flex-wrap gap-4 justify-center sm:justify-start lg:justify-center">
              <a
                href="https://github.com/gugisek"
                target="_blank"
                rel="noreferrer"
                className="neu-press inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-[Lexend-medium] text-[#2e2e2e]"
              >
                <GithubIcon />
                {labels.github}
              </a>
              <a
                href={labels.contactHref}
                className="neu-press group inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-[Lexend-medium] text-[#2e2e2e]"
              >
                {labels.contact}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </motion.aside>

          {/* experience */}
          <motion.div
            ref={panelRef}
            className="about-panel min-w-0 lg:col-span-7 rounded-[2rem] p-5 sm:p-7 md:p-9 scroll-mt-8"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-[Lexend-bold] text-2xl md:text-3xl text-[#2e2e2e]">
                  {labels.timelineTitle}
                </h3>
                <p className="text-neutral-500 text-sm mt-1">{labels.timelineSubtitle}</p>
              </div>

              <LayoutGroup id={`${id}-filters`}>
                <div
                  role="tablist"
                  className="flex gap-3 overflow-x-auto -mx-3 px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {FILTER_ORDER.filter((key) => counts[key] > 0).map((key) => {
                    const active = filter === key;
                    return (
                      <button
                        key={key}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setFilter(key)}
                        className={`relative  shrink-0 rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                          active
                            ? "text-[#2e2e2e] font-[Lexend-medium]"
                            : "about-out-sm text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId={`${id}-filter-pill`}
                            className="about-in absolute inset-0 rounded-full"
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          />
                        )}
                        <span className="relative flex items-center gap-2">
                          {labels.filters[key]}
                          <span className="text-[11px] tabular-nums text-neutral-400">
                            {counts[key]}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <div
              ref={timelineRef}
              className={`relative mt-6 ${
                collapsed
                  ? "[mask-image:linear-gradient(to_bottom,black_65%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
                  : ""
              }`}
            >
              <div className="about-groove absolute left-[13px] top-3 bottom-3 w-[7px] rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-x-[2px] top-[2px] bottom-[2px] rounded-full bg-gradient-to-b from-[#8a8a8a] to-[#3d3d3d] origin-top"
                  style={{ scaleY: progress }}
                />
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                {groups.map((group) => (
                  <motion.div
                    key={group.year}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative pb-6 last:pb-0"
                  >
                    <div className="relative flex items-center gap-4 pl-12 mb-4">
                      <span className="about-out-sm absolute left-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center">
                        <span className="w-[5px] h-[5px] rounded-full bg-[#3d3d3d]" />
                      </span>
                      <span className="font-[Lexend-bold] text-2xl md:text-3xl text-[#2e2e2e] tabular-nums">
                        {group.year}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-neutral-900/15 to-transparent" />
                    </div>

                    <ul className="space-y-4">
                      {group.items.map((experience) => (
                        <ExperienceItem
                          key={`${experience.year}-${experience.month}-${experience.name}`}
                          experience={experience}
                          kindLabel={labels.filters[experience.kind]}
                          nowLabel={labels.now}
                        />
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {collapsible && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={toggleExpanded}
                  aria-expanded={expanded}
                  className="neu-press inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-[Lexend-medium] text-[#2e2e2e]"
                >
                  {expanded ? labels.showLess : labels.showMore(hiddenCount)}
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex"
                  >
                    <ChevronIcon />
                  </motion.span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

function ExperienceItem({
  experience,
  kindLabel,
  nowLabel,
}: {
  experience: Experience;
  kindLabel: string;
  nowLabel: string;
}) {
  const Icon = KIND_ICONS[experience.kind];
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12"
    >
      <span
        className={`absolute left-0 top-4 flex items-center justify-center w-[33px] h-[33px] rounded-full ${
          experience.current
            ? "bg-[#3d3d3d] text-white shadow-[4px_4px_10px_rgba(0,0,0,0.25),-4px_-4px_10px_rgba(255,255,255,0.9)]"
            : "about-out-sm text-neutral-600"
        }`}
      >
        {experience.current && (
          <span className="absolute inset-0 rounded-full bg-neutral-900 animate-ping opacity-20" />
        )}
        <Icon />
      </span>

      <div className="about-card rounded-2xl px-4 py-3.5 md:px-5 md:py-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
          <span className="uppercase tracking-wider">{kindLabel}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-400" />
          <span>
            {experience.month} {experience.year}
          </span>
          {experience.current ? (
            <span className=" ml-auto inline-flex items-center gap-1.5 rounded-full text-emerald-700 px-2.5 py-0.5 font-[Lexend-medium]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {nowLabel}
            </span>
          ) : (
            experience.duration && (
              <span className=" ml-auto rounded-full px-2.5 py-0.5 text-neutral-600">
                {experience.duration}
              </span>
            )
          )}
        </div>

        <h4 className="mt-1.5 font-[Lexend-medium] text-lg md:text-xl text-[#2e2e2e] leading-snug">
          {experience.name}
        </h4>
        <p className="text-neutral-700 leading-snug">{experience.place}</p>
        {experience.description && (
          <p className="mt-1.5 text-sm text-neutral-500">{experience.description}</p>
        )}
      </div>
    </motion.li>
  );
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function BriefcaseIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8Z" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg {...iconProps}>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14 -1.5 8 5-3 5 3-1.5-8" />
    </svg>
  );
}

const KIND_ICONS: Record<ExperienceKind, () => JSX.Element> = {
  work: BriefcaseIcon,
  internship: WrenchIcon,
  education: CapIcon,
  certificate: AwardIcon,
};

function PinIcon() {
  return (
    <svg {...iconProps} width={14} height={14}>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg {...iconProps}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
