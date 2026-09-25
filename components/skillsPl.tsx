"use client";

import React from "react";
import SkillsSection from "./skills-section";
import { hardwareItems, pluralPl, PortfolioData, skillItems } from "@lib/portfolio";

type Props = { data: PortfolioData };

export default function skills({ data }: Props) {
  return (
    <SkillsSection
      labels={{
        languages: { title: "Języki programowania, które znam", count: (n) => `${n} ${pluralPl(n, "technologia", "technologie", "technologii")}` },
        apps: { title: "Aplikacje, z których korzystam", count: (n) => `${n} ${pluralPl(n, "aplikacja", "aplikacje", "aplikacji")}` },
        hardware: { title: "Moje umiejętności", count: (n) => `${n} ${pluralPl(n, "obszar", "obszary", "obszarów")}` },
      }}
      skills={skillItems(data.skills, "pl")}
      apps={skillItems(data.apps, "pl")}
      hardwares={hardwareItems(data, "pl")}
    />
  );
}
