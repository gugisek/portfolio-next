"use client";
import React from "react";
import AboutSection, { AboutLabels } from "@components/about-section";
import { aboutExperiences, aboutProfile, paragraphs, PortfolioData, t } from "@lib/portfolio";
type Props = { data: PortfolioData };
export default function aboutme({ data }: Props) {
  const labels: AboutLabels = {
    eyebrow: "O mnie",
    heading: "Kim jestem",
    role: t(data.profile.role, "pl"),
    location: t(data.profile.location, "pl"),
    bio: paragraphs(t(data.profile.bio, "pl")),
    stats: data.profile.stats.map((stat) => ({ value: stat.value, label: t(stat.label, "pl") })),
    github: "GitHub",
    contact: "Napisz do mnie",
    contactHref: "#kontakt",
    timelineTitle: "Doświadczenie i edukacja",
    timelineSubtitle: "Wszystko, co mnie do tej pory ukształtowało",
    now: "Teraz",
    showMore: (hidden) => `Pokaż więcej (${hidden})`,
    showLess: "Pokaż mniej",
    filters: {
      all: "Wszystko",
      work: "Praca",
      internship: "Praktyki",
      education: "Edukacja",
      certificate: "Certyfikaty",
    },
  };

  return (
    <AboutSection
      id="o-mnie"
      labels={labels}
      experiences={aboutExperiences(data, "pl")}
      profile={aboutProfile(data)}
    />
  );
}
