"use client";
import React from "react";
import AboutSection, { AboutLabels, Experience } from "@components/about-section";
type Props = {};
export default function aboutme({}: Props) {
  const experiances: Experience[] = [
    {
      kind: "education",
      name: "Studies",
      description: "Mechatronics",
      place: "Wojskowa Akademia Techniczna",
      year: "2024",
      month: "October",
      duration: "still learning",
      current: true,
    },
    {
      kind: "education",
      name: "Technical education",
      description: "Final result: 96%",
      place: "Polish IT technician 351203",
      year: "2024",
      month: "May",
      duration: "",
    },
    {
      kind: "work",
      name: "First job",
      description: "serviceman",
      place: "Jablkowy - Apple Authorized Service",
      year: "2023",
      month: "June",
      duration: "2023 - 2025",
    },
    {
      kind: "internship",
      name: "Intership",
      description: "serviceman",
      place: "Jablkowy - Apple Authorized Service",
      year: "2023",
      month: "May",
      duration: "1 month",
    },
    {
      kind: "certificate",
      name: "CISCO certificate",
      description: "Introduction to Cybersecurity",
      place: "Cisco Computer Networking Academy",
      year: "2022",
      month: "November",
      duration: "",
    },
    {
      kind: "internship",
      name: "International intership",
      description: "web developer / robot constructor",
      place: "Greece Leptocaria",
      year: "2022",
      month: "October",
      duration: "2 weeks",
    },
    {
      kind: "certificate",
      name: "Professional exam",
      description: "INF-02 practical 100% / theory 96%",
      place: "Zespół szkół nr 14 w Warszawie",
      year: "2022",
      month: "June",
      duration: "",
    },
    {
      kind: "internship",
      name: "Intership",
      description: "helpdesk / serviceman / networker",
      place: "123i serwis komputerów / Wołomin",
      year: "2022",
      month: "May",
      duration: "1 month",
    },
    {
      kind: "education",
      name: "High School",
      description: "IT technician",
      place: "Zespół szkół nr 14 w Warszawie",
      year: "2019",
      month: "September",
      duration: "5 years",
    },
  ];

  const labels: AboutLabels = {
    eyebrow: "About me",
    heading: "Who I am",
    role: "Web developer & Mechatronics student",
    location: "Warsaw, Poland",
    bio: [
      "I’m from Warsaw, Poland. I’m a 22 year old student at Wojskowa Akademia Techniczna, in my second year of Mechatronics.",
      "My passion is programming, especially creating websites. I also find time to repair electronic devices, in particular Apple iPhones.",
    ],
    stats: [
      { value: "6+", label: "years of coding" },
      { value: "2", label: "years at Apple service" },
      { value: "100%", label: "INF-02 practical" },
    ],
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

  return <AboutSection id="about-me" labels={labels} experiences={experiances} />;
}
