"use client";

import React from "react";
import Post from "@components/post";
import { motion } from "framer-motion";
import { PortfolioData, projectItems } from "@lib/portfolio";

type Props = { data: PortfolioData };

export default function works({ data }: Props) {
  const projects = projectItems(data, "pl");
  return (
    <section
      id="projekty"
      className="min-h-screen text-neutral-900 flex flex-col items-center justify-start pb-7"
    >
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="uppercase font-[Lexend-bold] text-5xl text-[#e0e0e0] py-16 text-center"
      >
        Moje projekty
      </motion.h1>
      {projects.map((project, index) => (
        <Post
          key={index}
          name={project.name}
          description={project.description}
          link={project.link}
          github={project.github}
          images={project.images}
          technologies={project.technologies}
        />
      ))}
    </section>
  );
}
