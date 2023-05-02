"use client"

import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

export default function Contact({}: Props) {
  const socials = [
    {name: 'instagram', link: 'https://www.instagram.com/gugisek_foto/'},
    {name: 'facebook', link: 'https://www.facebook.com/gugisek.gu/'},
    {name: 'github', link: 'https://github.com/gugisek'},
  ]
  return (
    <section id="kontakt" className='text-neutral-900 font-[Lexend]'>
        <motion.h1 
        initial={{ opacity: 0.4, y: 70 }}
        whileInView={{ opacity: 1, y: 0, transition: {
          duration: 0.5
        }}}
        className='text-[#E0E0E0] font-[Lexend-bold] sm:text-7xl text-6xl ml-[10%]'>KONTAKT</motion.h1>
        <div className='bg-[#e0e0e0] min-h-[70vh]'>
            <h1 className='font-[Lexend-bold] sm:text-7xl text-6xl ml-[10%] text-white'>KONTAKT</h1>
            <div className='w-full min-h-[70vh] flex md:flex-row flex-col items-center justify-center gap-9'>
              <motion.img 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0, transition: {
                    type: "animate",
                    duration: 1
              }}}
              src="img/profile.jpg" alt="profile" className='rounded-full shadow-2xl' />
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0, transition: {
                    type: "animate",
                    duration: 1
              }}}
              className='flex flex-col gap-2 md:px-1 px-8'>
                <div className='flex flex-row md:gap-9 gap-2 flex-wrap'>
                {socials.map((social, index) => (
                  <div key={index}  className='flex flex-row items-center justify-center'>
                    <img key={index}  src={"img/buttons/"+social.name + ".png"} alt={social.name + "icon"} className='w-[25px] mr-3'/>
                      <a key={index} href={social.link} target="_blank" rel="noreferrer" className="uppercase transition-all duration-300" id={social.name}>{social.name}</a>
                  </div>
                ))}
                </div>
                <div className='flex flex-row md:gap-9 gap-2 items-center flex-wrap'>
                  <div>
                    <p className='m-0 p-0'>18 lat</p>
                    <p className='text-xl font-[Lexend-bold] m-0 p-0 mt-[-6px]'>Gustaw Sołdecki</p>
                  </div>
                  <div className='flex flex-row items-center justify-center'>
                    <img src="img/buttons/location.png" alt="location icon" className='w-[30px] mr-3'/>
                    <a href='https://www.google.pl/maps/@52.2507275,21.0377675,11.34z' target="_blank" rel="noreferrer" className='hover:text-gray-400 transition-all duration-300'>Warszawa, Polska</a>
                  </div>
                </div>
                <div className='flex flex-row items-center justify-start'>
                  <img src="img/buttons/gmail.png" alt="gmail icon" className='w-[35px] mr-3'/>
                  <a href="mailto:gugisek@gmail.com" className='hover:text-blue-400 transition-all duration-300'>gugisek@gmail.com</a>
                </div>
              </motion.div>
            </div>
        </div>
    </section>
  )
}