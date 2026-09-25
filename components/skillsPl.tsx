"use client";

import React from "react";
import SkillsSection from "./skills-section";

type Props = {};

export default function skills({}: Props) {
  const skills = [
    { name: "HTML", image: "img/skills/langs/html.svg", experience: "6 lat" },
    { name: "CSS", image: "img/skills/langs/css.svg", experience: "6 lat" },
    { name: "PHP", image: "img/skills/langs/php.svg", experience: "5 lat" },
    {
      name: "MySQL",
      image: "img/skills/langs/mysql.png",
      experience: "5 lat",
    },
    {
      name: "JavaScript",
      image: "img/skills/langs/javascript.png",
      experience: "4 lata",
    },
    { name: "React", image: "img/skills/langs/react.png", experience: "2 lata" },
    {
      name: "Next.js",
      image: "img/skills/langs/next.png",
      experience: "2 lata",
    },
    {
      name: "Tailwind CSS",
      image: "img/skills/langs/tailwindcss.png",
      experience: "2 lata",
    },
    {
      name: "Framer Motion",
      image: "img/skills/langs/framer-motion.svg",
      experience: "2 lata",
    },
  ];

  const apps = [
    {
      name: "VS Code",
      image: "img/skills/programs/vscode.png",
      experience: "5 lat",
    },
    {
      name: "Adobe PremiePro",
      image: "img/skills/programs/premierepro.png",
      experience: "5 lat",
    },
    {
      name: "Gimp",
      image: "img/skills/programs/gimp.png",
      experience: "8 lat",
    },
    {
      name: "Figma",
      image: "img/skills/programs/figma.webp",
      experience: "3 lata",
    },
    {
      name: "SkechtUp",
      image: "img/skills/programs/sketchup.png",
      experience: "10 lat",
    },
    {
      name: "Ultimaker Cura",
      image: "img/skills/programs/cura.png",
      experience: "2 lata",
    },
    {
      name: "Wordpress",
      image: "img/skills/programs/wordpress.png",
      experience: "5 lat",
    },
    { name: "Git", image: "img/skills/programs/git.png", experience: "2 lata" },
    {
      name: "Github",
      image: "img/skills/programs/github2.png",
      experience: "2 lata",
    },
    {
      name: "Termius",
      image: "img/skills/programs/termius.svg",
      experience: "2 lata",
    },
  ];

  const hardwares = [
    {
      name: "PC",
      image: "pc.png",
      image_hover: "pc2.png",
      experience: "budowa i naprawa",
    },
    {
      name: "Apple iPhone",
      image: "iPhone.png",
      image_hover: "iphone2.jpg",
      experience: "serwis i naprawa",
    },
    {
      name: "Stanowiska",
      image: "desktop2.jpg",
      image_hover: "desktop.png",
      experience: "projekt i budowa",
    },
    {
      name: "Ledy RGB, aRGB",
      image: "leds.jpg",
      image_hover: "leds3.png",
      experience: "implementacja",
    },
    {
      name: "Smart home",
      image: "smarthome3.png",
      image_hover: "smarthome2.png",
      experience: "ustawianie",
    },
    {
      name: "Lutowanie",
      image: "soldering2.png",
      image_hover: "soldering.png",
      experience: "średni poziom",
    },
    {
      name: "Druk 3D",
      image: "3dprinting4.png",
      image_hover: "3dprinting.png",
      experience: "początkujący",
    },
    {
      name: "Sieci i serwery",
      image: "webserver2.png",
      image_hover: "webserver3.png",
      experience: "administrowanie",
    },
  ];

  return (
    <SkillsSection
      labels={{
        languages: { title: "Języki programowania, które znam", count: (n) => `${n} ${pluralPl(n, "technologia", "technologie", "technologii")}` },
        apps: { title: "Aplikacje, z których korzystam", count: (n) => `${n} ${pluralPl(n, "aplikacja", "aplikacje", "aplikacji")}` },
        hardware: { title: "Moje umiejętności", count: (n) => `${n} ${pluralPl(n, "obszar", "obszary", "obszarów")}` },
      }}
      skills={skills}
      apps={apps}
      hardwares={hardwares}
    />
  );
}

function pluralPl(n: number, one: string, few: string, many: string) {
  if (n === 1) return one;
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14) ? few : many;
}
