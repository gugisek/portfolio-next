"use client";

import React from "react";
import SkillsSection from "./skills-section";

type Props = {};

export default function skills({}: Props) {
  const skills = [
    { name: "HTML", image: "img/skills/langs/html.svg", experience: "6 years" },
    { name: "CSS", image: "img/skills/langs/css.svg", experience: "6 years" },
    { name: "PHP", image: "img/skills/langs/php.svg", experience: "5 years" },
    {
      name: "MySQL",
      image: "img/skills/langs/mysql.png",
      experience: "5 years",
      //od 2020
    },
    {
      name: "JavaScript",
      image: "img/skills/langs/javascript.png",
      experience: "4 years",
    },
    {
      name: "React",
      image: "img/skills/langs/react.png",
      experience: "2 years",
      // od 2023
    },
    {
      name: "Next.js",
      image: "img/skills/langs/next.png",
      experience: "2 years",
    },
    {
      name: "Tailwind CSS",
      image: "img/skills/langs/tailwindcss.png",
      experience: "2 years",
    },
    {
      name: "Framer Motion",
      image: "img/skills/langs/framer-motion.svg",
      experience: "2 years",
    },
  ];

  const apps = [
    {
      name: "VS Code",
      image: "img/skills/programs/vscode.png",
      experience: "5 years",
    },
    {
      name: "Adobe PremiePro",
      image: "img/skills/programs/premierepro.png",
      experience: "5 years",
    },
    {
      name: "Gimp",
      image: "img/skills/programs/gimp.png",
      experience: "8 years",
    },
    {
      name: "Figma",
      image: "img/skills/programs/figma.webp",
      experience: "3 years",
    },
    {
      name: "SkechtUp",
      image: "img/skills/programs/sketchup.png",
      experience: "10 years",
    },
    {
      name: "Ultimaker Cura",
      image: "img/skills/programs/cura.png",
      experience: "2 years",
    },
    {
      name: "Wordpress",
      image: "img/skills/programs/wordpress.png",
      experience: "5 years",
    },
    { name: "Git", image: "img/skills/programs/git.png", experience: "2 years" },
    {
      name: "Github",
      image: "img/skills/programs/github2.png",
      experience: "2 years",
    },
    {
      name: "Termius",
      image: "img/skills/programs/termius.svg",
      experience: "2 years",
    },
  ];

  const hardwares = [
    {
      name: "PC",
      image: "pc.png",
      image_hover: "pc2.png",
      experience: "build and repair",
    },
    {
      name: "Apple iPhone",
      image: "iPhone.png",
      image_hover: "iphone2.jpg",
      experience: "service and repair",
    },
    {
      name: "Desktop",
      image: "desktop2.jpg",
      image_hover: "desktop.png",
      experience: "project and build",
    },
    {
      name: "Leds RGB, aRGB",
      image: "leds.jpg",
      image_hover: "leds3.png",
      experience: "implementation",
    },
    {
      name: "Smart home",
      image: "smarthome3.png",
      image_hover: "smarthome2.png",
      experience: "setting up",
    },
    {
      name: "Soldering",
      image: "soldering2.png",
      image_hover: "soldering.png",
      experience: "medium stage",
    },
    {
      name: "3D printing",
      image: "3dprinting4.png",
      image_hover: "3dprinting.png",
      experience: "entry stage",
    },
    {
      name: "Web and server",
      image: "webserver2.png",
      image_hover: "webserver3.png",
      experience: "administration",
    },
  ];

  return (
    <SkillsSection
      labels={{
        languages: { title: "Languages that I know", count: (n) => `${n} technologies` },
        apps: { title: "Apps which I use", count: (n) => `${n} apps` },
        hardware: { title: "And my hardware skills", count: (n) => `${n} areas` },
      }}
      skills={skills}
      apps={apps}
      hardwares={hardwares}
    />
  );
}
