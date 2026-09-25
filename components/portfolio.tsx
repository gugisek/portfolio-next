"use client";

import React from "react";
import { Lang, PortfolioData } from "@lib/portfolio";
import { NavBar, NavBarPl, Hero, HeroPl, Skills, SkillsPl, Works, WorksPl, Contact, ContactPl, Footer, FooterPl } from "@components";

type Props = { data: PortfolioData; lang: Lang };

// client boundary for the portfolio: the pages read data/portfolio.json on the server and hand it over here
export default function Portfolio({ data, lang }: Props) {
  if (lang === "pl") {
    return (
      <>
        <NavBarPl />
        <HeroPl data={data} />
        <SkillsPl data={data} />
        <WorksPl data={data} />
        <ContactPl data={data} />
        <FooterPl data={data} />
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Hero data={data} />
      <Skills data={data} />
      <Works data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </>
  );
}
