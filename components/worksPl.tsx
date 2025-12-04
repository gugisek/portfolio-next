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
        '<p>                Aplikacja internetowa dla mojego pomysłu portalu dla <span style="color: #fd5959">osiedli</span>. Stworzona na Warszawski konkurs między szkolny w którym zajęła <span style="color: #fd5959">pierwsze miejsce</span>.</p>                <li>4 poziomy zarządzania</li>                <li>wspiera dedykowany elektroniczny kiosk</li>                <li>działa również na telefonach</li>                <li>ogłoszenia, finanse, dokumenty</li>                ',
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
        '<p>                Aplikacja internetowa dla szkolnych <span style="color: #9233d1">korepetycji</span>.</p>                <li>4 różne panele użytkowników</li>                <li>dużo ustawień korepetycji</li>                <li>wspiera różne szkoły oraz kilka budynków</li>                <li>ustawialne tła paneli</li>                ',
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
        "<p>Gamingowy sklep, w pełni dostosowany schemat <span style='color: #7b02ff'>woocomerce</span>.</p>                <li>działające strony produktów</li>                <li>dostęne wariany produktów</li>                <li>zoomowane zdjęcia</li>                <li>nowoczesny wygląd siatki produktów </li>            <p>                Kody promocyjne oraz płatności przez <span style='color: #3013E1'>Gpay</span> i <span style='color: #000'>Apple Pay</span>                <br>                Dodatkowe płatności przez <span style='color: #35A5E4'>PayPal</span> oraz <span style='color: #BE06FF'>Stripe</span>                <br>                Różne metody dostawy w tym <span style='color: #C99612'>Paczkomat InPost</span>           </p>",
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
        "<p>                Strona z <span style='color: #d800ff'>poradnikami</span> do egzaminów technika informatyka.            </p>                <li>działający pasek wyszukiwania</li>                <li>sortowanie elementów po dacie</li>                <li>pobieranie plików z serwera </li>            <p>                Opiera się na podstronach oraz folderze z elementami jako obiekty na stronie.            </p>",
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
        '<p>Stworzony do prywatnego użytku z używanego ASUS&apos;a. <br>W pełni odwzorowane podzespoły laptopa jako obiekty 3D. <br>Zaprojektowane wszystkie części obudowy uwzględniając wsporniki, później wszystko zostało <span style="color: #c1714c">wydrukowane w 3D</span>.<br>Na koniec wszystko zostało oklejone zamszem.</p> <br><p style="color: #9d9d9d">Czas poświęcony: 4 tygodnie</p>',
      link: "",
      github: "",
      image1: "laptop1.jpg",
      image2: "laptop2.jpg",
      image3: "laptop3.jpg",
      technologies: "sketchup Ultimaker-Cura druk-3D",
    },
    {
      name: "Wizytówka dla szkoły",
      description:
        '<p>W pełni zbudowane oraz zaprojektowane przeze mnie <span style="color: #34ad51">w 4 dni</span> dla szkoły na dni otwarte. Prosta budowa na jednej podstronie. Każdy element ma animacje z framer motion. <br/>Pisane sekcja za sekcją. Pomysł na stronę w 100% jest mój.</p>',
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
        "<p>                Aplikacja do organizacji <span style='color: #ff0000'>imprez</span> w okolicy.            </p>                <li>w pełni operatywny prototyp</li>                <li>warianty dla przycisków</li>                <li>przewidziana funkcja czatów</li>                <li>animacje przejścia</li>            <p>               Zaprojektowane aby łatwo i szybko znajdować nowych ludzi na imprezy. Tylko prototyp.            </p>",
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
        '<p>                Strona dla agnecji <span style="color: #0097ff">social media</span> świadczącej usługi <span style="color: #0097ff">IT</span>.            </p>                <li>w pełni operatywny prototyp</li>                <li>warianty dla przycisków</li>                <li>zaprojaktowany panel klienta z różnymi sekcjami</li>                <li>widżety w panelu kienta</li>                <li>dynamiczne efekty przewijania na stronie głównej</li>',
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
      id="projekty"
      className="min-h-screen text-neutral-900 flex flex-col items-center justify-start pb-7"
    >
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="uppercase font-[Lexend-bold] text-5xl text-[#e0e0e0] py-16"
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
          image1={project.image1}
          image2={project.image2}
          image3={project.image3}
          technologies={project.technologies}
        />
      ))}
    </section>
  );
}
