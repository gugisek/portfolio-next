"use client";
import React from "react";
import AboutSection, { AboutLabels, Experience } from "@components/about-section";
type Props = {};
export default function aboutme({}: Props) {
  const experiances: Experience[] = [
    {
      kind: "education",
      name: "Studia",
      description: "Mechatronika",
      place: "Wojskowa Akademia Techniczna",
      year: "2024",
      month: "Październik",
      duration: "ciągle trwa",
      current: true,
    },
    {
      kind: "education",
      name: "Wykształcenie techniczne",
      description: "Końcowy wynik: 96%",
      place: "Technik Informatyk 351203",
      year: "2024",
      month: "Maj",
      duration: "",
    },
    {
      kind: "work",
      name: "Pierwsza praca",
      description: "serwisant",
      place: "Jabłkowy - Autoryzowany Serwis Apple",
      year: "2023",
      month: "Czerwiec",
      duration: "2023 - 2025",
    },
    {
      kind: "internship",
      name: "Praktyki",
      description: "serwisant",
      place: "Jabłkowy - Autoryzowany Serwis Apple",
      year: "2023",
      month: "Maj",
      duration: "1 miesiąc",
    },
    {
      kind: "certificate",
      name: "Certyfikat CISCO",
      description: "Wprowadzenie do Cyberbezpieczeństwa",
      place: "Akademia Sieci Komputerowych Cisco",
      year: "2022",
      month: "Listopad",
      duration: "",
    },
    {
      kind: "internship",
      name: "Międzynarodowe praktyki",
      description: "web developer / robot constructor",
      place: "Grecja Leptocaria",
      year: "2022",
      month: "Październik",
      duration: "2 tygodnie",
    },
    {
      kind: "certificate",
      name: "Egzamin kwalifikacyjny",
      description: "INF-02 praktyczny 100% / teoria 96%",
      place: "Zespół szkół nr 14 w Warszawie",
      year: "2022",
      month: "Czerwiec",
      duration: "",
    },
    {
      kind: "internship",
      name: "Praktyki",
      description: "helpdesk / serwisant / networker",
      place: "123i serwis komputerów / Wołomin",
      year: "2022",
      month: "Maj",
      duration: "1 miesiąc",
    },
    {
      kind: "education",
      name: "Szkoła średnia",
      description: "technik informatyk",
      place: "Zespół szkół nr 14 w Warszawie",
      year: "2019",
      month: "Wrzesień",
      duration: "5 lat",
    },
  ];

  const labels: AboutLabels = {
    eyebrow: "O mnie",
    heading: "Kim jestem",
    role: "Web developer i student mechatroniki",
    location: "Warszawa, Polska",
    bio: [
      "Mam 22 lata, jestem na drugim roku mechatroniki na Wojskowej Akademii Technicznej.",
      "Moją pasją jest programowanie, a w szczególności tworzenie stron internetowych. Znajduję też czas na naprawę sprzętu elektronicznego, szczególnie upodobałem sobie naprawy sprzętu Apple.",
    ],
    stats: [
      { value: "6+", label: "lat kodowania" },
      { value: "2", label: "lata w serwisie Apple" },
      { value: "100%", label: "INF-02 praktyka" },
    ],
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

  return <AboutSection id="o-mnie" labels={labels} experiences={experiances} />;
}
