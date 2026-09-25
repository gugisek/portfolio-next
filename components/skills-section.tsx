"use client";
import React from "react";
import { motion } from "framer-motion";
import Skill from "./skill";
import Hardware from "./hardware";

type SkillItem = { name: string; image: string; experience: string };
type HardwareItem = SkillItem & { image_hover: string };

type GroupLabels = { title: string; count: (n: number) => string };

export type SkillsLabels = {
  languages: GroupLabels;
  apps: GroupLabels;
  hardware: GroupLabels;
};

type Props = {
  labels: SkillsLabels;
  skills: SkillItem[];
  apps: SkillItem[];
  hardwares: HardwareItem[];
};

function years(experience: string) {
  return parseInt(experience, 10) || 0;
}

function withLevels(items: SkillItem[]) {
  const max = Math.max(...items.map((item) => years(item.experience)), 1);
  return items.map((item) => ({ ...item, level: years(item.experience) / max }));
}

function GroupHeader({ index, total, labels, count }: { index: number; total: number; labels: GroupLabels; count: number }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center px-[5%] pt-24 pb-12 md:pb-14"
    >
      <span className="neu-pill inline-flex items-center gap-3 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-[#7a7a7a]">
        <span className="font-[Lexend-bold] text-[#3d3d3d] tabular-nums">
          {String(index).padStart(2, "0")}
          <span className="text-[#a8a8a8]"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-[#a8a8a8]" />
        {labels.count(count)}
      </span>
      <h2 className=" mt-6 font-[Lexend-bold] uppercase text-[#3d3d3d] text-3xl sm:text-5xl md:text-6xl leading-[1.05] max-w-4xl">
        {labels.title}
      </h2>
    </motion.header>
  );
}

export default function SkillsSection({ labels, skills, apps, hardwares }: Props) {
  const skillGroups = [
    { labels: labels.languages, items: withLevels(skills) },
    { labels: labels.apps, items: withLevels(apps) },
  ];
  const total = skillGroups.length + 1;

  return (
    <section className="min-h-screen text-neutral-900 bg-[#e0e0e0] flex flex-col items-center pb-24 gap-24">
      {skillGroups.map((group, groupIndex) => (
        <React.Fragment key={group.labels.title}>
          <GroupHeader index={groupIndex + 1} total={total} labels={group.labels} count={group.items.length} />
          <div className="flex flex-row flex-wrap gap-6 sm:gap-8 justify-center px-5 sm:px-6 max-w-[1060px] w-full">
            {group.items.map((item, index) => (
              <Skill
                key={item.name}
                index={index}
                name={item.name}
                image={item.image}
                experience={item.experience}
                level={item.level}
              />
            ))}
          </div>
        </React.Fragment>
      ))}

      <GroupHeader index={total} total={total} labels={labels.hardware} count={hardwares.length} />
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center px-[5%] sm:px-[10%] max-w-[1100px]">
        {hardwares.map((hardware) => (
          <Hardware
            key={hardware.name}
            name={hardware.name}
            image={hardware.image}
            image_hover={hardware.image_hover}
            experience={hardware.experience}
          />
        ))}
      </div>
    </section>
  );
}
