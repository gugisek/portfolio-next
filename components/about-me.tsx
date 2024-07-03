"use client";
import React from "react";
import { motion } from "framer-motion";
import Tree from "@components/tree";
type Props = {};
export default function aboutme({}: Props) {
  const experiances = [
    {
      name: "Technical education",
      description: "Final result: 96%",
      place: "Polish IT technician 351203",
      year: "2024",
      month: "May",
      duration: "",
    },
    {
      name: "First job",
      description: "serviceman",
      place: "Jablkowy - Apple Authorized Service",
      year: "2023",
      month: "June",
      duration: "1 year",
    },
    {
      name: "Intership",
      description: "serviceman",
      place: "Jablkowy - Apple Authorized Service",
      year: "2023",
      month: "May",
      duration: "1 month",
    },
    {
      name: "CISCO certificate",
      description: "Introduction to Cybersecurity",
      place: "Cisco Computer Networking Academy",
      year: "2022",
      month: "November",
      duration: "",
    },
    {
      name: "International intership",
      description: "web developer / robot constructor",
      place: "Greece Leptocaria",
      year: "2022",
      month: "October",
      duration: "2 weeks",
    },
    {
      name: "Professional exam",
      description: "INF-02 practical 100% / theory 96%",
      place: "Zespół szkół nr 14 w Warszawie",
      year: "2022",
      month: "June",
      duration: "",
    },
    {
      name: "Intership",
      description: "helpdesk / serviceman / networker",
      place: "123i serwis komputerów / Wołomin",
      year: "2022",
      month: "May",
      duration: "1 month",
    },
    {
      name: "High School",
      description: "IT technician",
      place: "Zespół szkół nr 14 w Warszawie",
      year: "2019",
      month: "September",
      duration: "Still learning",
    },
  ];
  return (
    <div
      id="about-me"
      className="min-h-[60vh] flex md:flex-row flex-col items-center justify-evenly text-neutral-900 md:px-[8%] px-[5%] md:py-0 py-20"
    >
      <section className="w-1/3 md:block hidden overflow-y-scroll h-[30vh]">
        {experiances.map((experiance, index) => (
          <Tree
            key={index}
            name={experiance.name}
            description={experiance.description}
            place={experiance.place}
            year={experiance.year}
            month={experiance.month}
            duration={experiance.duration}
          />
        ))}
        {/* cv jeszcze dodać */}
      </section>
      <div className="flex justify-center items-center flex-col md:w-1/3 w-2/3">
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              type: "spring",
              duration: 1,
            },
          }}
          href="https://github.com/gugisek"
          target={"_blank"}
        >
          <img
            src="img/profile.jpg"
            alt="profile"
            className="rounded-full grayscale hover:grayscale-0 hover:shadow-xl transition-all duration-300"
          />
        </motion.a>
        <h1 className="text-2xl font-[Lexend-medium] py-2">Gustaw Sołdecki</h1>
      </div>
      <motion.div
        className="md:w-1/3 w-2/3 text-xl font-[Roboto-light]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            type: "animate",
            duration: 1,
          },
        }}
        exit={{
          opacity: 0,
          x: 100,
          transition: {
            type: "spring",
            duration: 1,
          },
        }}
      >
        I’m from Warsaw, Poland. I’m 19 year old student at technical school in
        5’th class.
        <br />
        <br />
        My passion is programming, specially creating websites. Also I have time
        to repairing electronic devices, in particular apple iphones.
      </motion.div>
    </div>
  );
}
