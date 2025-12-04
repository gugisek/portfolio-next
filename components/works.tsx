"use client";

import React from "react";
import Post from "@components/post";
import { motion } from "framer-motion";

type Props = {};

export default function works({}: Props) {
  const projects = [
    {
      name: "mOsiedle.pl",
      description:
        '<p>                Web app for my own idea of administrative portal for <span style="color: #fd5959">housing estates</span>. Created for Warsaw schools competition and <span style="color: #fd5959">won 800$</span> as first place.</p>                <li>4 levels of administration</li>                <li>supports special 27inch displays as Bulletin board</li>                <li>works as mobile web app</li>                <li>suitable for annoucements, financial or docs cases</li>                ',
      link: "https://panel.mosiedle.pl",
      github: "",
      image1: "mosiedle.png",
      image2: "mosiedle4.png",
      image3: "mosiedle3.png",
      technologies: "HTML CSS JS PHP MySQL",
    },
    {
      name: "EduKorepetycje",
      description:
        '<p>                Web app for school <span style="color: #9233d1">apointments</span>.</p>                <li>4 different stages of panels</li>                <li>fully customizable apointent settings</li>                <li>supports for multiple schools and buildings</li>                <li>customizable backgrounds</li>                ',
      link: "https://edukorepetycje.rgbpc.pl/",
      github: "https://github.com/gugisek/competition_apointments_zs14",
      image1: "edu4.png",
      image2: "edu3.png",
      image3: "edu2.png",
      technologies: "HTML CSS JS PHP MySQL",
    },
    {
      name: "RGBpc.pl",
      description:
        "<p>Gaming shop fully customized <span style='color: #7b02ff'>woocomerce</span> shematic.</p>                <li>fully working product pages</li>                <li>avaible variants</li>                <li>zooming photos</li>                <li>modernistic arhive style </li>            <p>                Promo codes and direct pay via <span style='color: #3013E1'>Gpay</span> and <span style='color: #000'>Apple Pay</span>                <br>                Working paynaments via <span style='color: #35A5E4'>PayPal</span> and <span style='color: #BE06FF'>Stripe</span>                <br>                Different shipping methods even <span style='color: #C99612'>InPost Paczkomat</span>           </p>",
      link: "https://rgbpc.pl",
      github: "",
      image1: "rgbpc1.png",
      image2: "rgbpc4.png",
      image3: "rgbpc3.png",
      technologies: "HTML CSS JS PHP MySQL Wordpress Linux",
    },
    {
      name: "praktyczny-informatyk.pl",
      description:
        "<p>                Website with <span style='color: #d800ff'>tutorials</span> for practical exams for IT.            </p>                <li>working search bar</li>                <li>sorting elements by date</li>                <li>download files from server</li>            <p>                Builded on subsites and folder with elements as objects in list on site.            </p>",
      link: "https://www.praktyczny-informatyk.pl",
      github: "https://github.com/gugisek/praktyczny-informatyk.pl",
      image1: "praktyczny-informatyk.pl.png",
      image2: "praktyczny-informatyk.pl2.png",
      image3: "praktyczny-informatyk.pl3.png",
      technologies: "HTML CSS JS PHP",
    },
    {
      name: "DIY laptop",
      description:
        '<p>Created for personal usage from used ASUS. <br>Fully mapped phisical parts of old laptop. <br>Projected all body parts with supports and later <span style="color: #c1714c">3D printed</span>.<br>On end covered with suede.</p> <br><p style="color: #9d9d9d">Time spent: 4 weeks</p>',
      link: "",
      github: "",
      image1: "laptop1.jpg",
      image2: "laptop2.jpg",
      image3: "laptop3.jpg",
      technologies: "sketchup Ultimaker-Cura 3D-printer",
    },
    {
      name: "School profile page",
      description:
        '<p>Fully builded and projected by me <span style="color: #34ad51">in 4 days</span> for school open days. Simple one page website with big hero section. Each element has animations from framer motion. <br/>Coded section by section. The idea for design is 100% mine.</p>',
      link: "https://zs14.praktyczny-informatyk.pl/",
      github: "https://github.com/gugisek/zs14-technik-inf",
      image1: "zs14.png",
      image2: "zs142.png",
      image3: "zs143.png",
      technologies: "next.js react.js tailwindcss framer-motion figma",
    },
    {
      name: "PartyHub",
      description:
        "<p>                App for <span style='color: #ff0000'>party</span> organization in local area.            </p>                <li>fully operative prototype</li>                <li>variants for buttons</li>                <li>projected messenging function</li>                <li>transition animations</li>            <p>                Builded for easy and fast finding new people to party with. Only prototype.            </p>",
      link: "",
      github: "",
      image1: "partyhub.png",
      image2: "partyhub2.png",
      image3: "partyhub3.png",
      technologies: "figma",
    },
    {
      name: "AgencyTech.pl",
      description:
        '<p>                Website for tech <span style="color: #0097ff">agency</span> with <span style="color: #0097ff">IT</span> services.            </p>                <li>fully operative prototype</li>                <li>variants for buttons</li>                <li>projected customer panel with diffrent sections</li>                <li>widgets in client panel</li>                <li>parallax scrolling efects on sections in home page</li>',
      link: "",
      github: "",
      image1: "at4.png",
      image2: "at2.png",
      image3: "at3.png",
      technologies: "figma",
    },
  ];
  return (
    <section
      id="my-works"
      className="min-h-screen text-neutral-900 flex flex-col items-center justify-start pb-7"
    >
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="uppercase font-[Lexend-bold] text-5xl text-[#e0e0e0] py-16"
      >
        My projects
      </motion.h1>
      {projects.map((project, index) => (
        <Post
          key={index}
          name={project.name}
          description={project.description}
          link={project.link}
          github={project.github}
          image1={project.image1}
          image2={project.image2}
          image3={project.image3}
          technologies={project.technologies}
        />
      ))}
    </section>
  );
}
