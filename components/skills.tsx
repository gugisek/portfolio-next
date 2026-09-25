"use client";

import React from "react";
import SkillsSection from "./skills-section";
import { hardwareItems, PortfolioData, skillItems } from "@lib/portfolio";

type Props = { data: PortfolioData };

export default function skills({ data }: Props) {
  return (
    <SkillsSection
      labels={{
        languages: { title: "Languages that I know", count: (n) => `${n} technologies` },
        apps: { title: "Apps which I use", count: (n) => `${n} apps` },
        hardware: { title: "And my hardware skills", count: (n) => `${n} areas` },
      }}
      skills={skillItems(data.skills, "en")}
      apps={skillItems(data.apps, "en")}
      hardwares={hardwareItems(data, "en")}
    />
  );
}
