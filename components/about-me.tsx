"use client";
import React from "react";
import AboutSection, { AboutLabels } from "@components/about-section";
import { aboutExperiences, aboutProfile, paragraphs, PortfolioData, t } from "@lib/portfolio";
type Props = { data: PortfolioData };
export default function aboutme({ data }: Props) {
  const labels: AboutLabels = {
    eyebrow: "About me",
    heading: "Who I am",
    role: t(data.profile.role, "en"),
    location: t(data.profile.location, "en"),
    bio: paragraphs(t(data.profile.bio, "en")),
    stats: data.profile.stats.map((stat) => ({ value: stat.value, label: t(stat.label, "en") })),
    github: "GitHub",
    contact: "Contact me",
    contactHref: "#contact",
    timelineTitle: "Experience & education",
    timelineSubtitle: "Everything that shaped me so far",
    now: "Now",
    showMore: (hidden) => `Show ${hidden} more`,
    showLess: "Show less",
    filters: {
      all: "All",
      work: "Work",
      internship: "Internship",
      education: "Education",
      certificate: "Certificate",
    },
  };

  return (
    <AboutSection
      id="about-me"
      labels={labels}
      experiences={aboutExperiences(data, "en")}
      profile={aboutProfile(data)}
    />
  );
}
