"use client";

import React from "react";
import { motion } from "framer-motion";
import Skill from "./skill";
import Hardware from "./hardware";

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
    <section className="min-h-screen text-neutral-900 bg-[#e0e0e0] bg-cover bg-fixed flex flex-col items-center justify-center">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        className="w-full h-20 flex items-center justify-center sm:text-5xl text-3xl font-[Lexend-bold] uppercase text-[#4e4e4e] py-20 text-center"
      >
        Języki programowania jakie znam
      </motion.div>
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center px-[10%] pb-8 max-w-[1000px]">
        {skills.map((skill, index) => (
          <Skill
            key={index}
            name={skill.name}
            image={skill.image}
            experience={skill.experience}
          />
        ))}
      </div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        className="w-full h-20 flex items-center justify-center sm:text-5xl text-3xl font-[Lexend-bold] uppercase text-[#4e4e4e] py-20 text-center"
      >
        Apliacje z jakich korzystam
      </motion.div>
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center px-[10%] pb-8 max-w-[1000px]">
        {apps.map((app, index) => (
          <Skill
            key={index}
            name={app.name}
            image={app.image}
            experience={app.experience}
          />
        ))}
      </div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        className="w-full h-20 flex items-center justify-center sm:text-5xl text-3xl font-[Lexend-bold] uppercase text-[#4e4e4e] py-20 text-center"
      >
        Moje umiejętności
      </motion.div>
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center px-[10%] pb-8 max-w-[1000px]">
        {hardwares.map((hardware, index) => (
          <Hardware
            key={index}
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
