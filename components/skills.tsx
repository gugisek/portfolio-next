"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Skill from './skill'
import Hardware from './hardware'

type Props = {}

export default function skills({}: Props) {

  const skills = [
    {name: 'HTML', image: 'img/skills/langs/html.svg', experience: '4 years'},
    {name: 'CSS', image: 'img/skills/langs/css.svg', experience: '4 years'},
    {name: 'PHP', image: 'img/skills/langs/php.svg' , experience: '3 years'},
    {name: 'MySQL', image: 'img/skills/langs/mysql.png' , experience: '3 years'},
    {name: 'JavaScript', image: 'img/skills/langs/javascript.png' , experience: '2 years'},
    {name: 'React', image: 'img/skills/langs/react.png'  , experience: '3 months'},
    {name: 'Next.js', image: 'img/skills/langs/next.png' , experience: '3 months'},
    {name: 'Tailwind CSS', image: 'img/skills/langs/tailwindcss.png' , experience: '3 months'},
    {name: 'Framer Motion', image: 'img/skills/langs/framer-motion.svg' , experience: '1 month'},
  ]

  const apps = [
    {name: 'VS Code', image: 'img/skills/programs/vscode.png', experience: '3 years'},
    {name: 'Adobe PremiePro', image: 'img/skills/programs/premierepro.png', experience: '3 years'},
    {name: 'Gimp', image: 'img/skills/programs/gimp.png' , experience: '6 years'},
    {name: 'Figma', image: 'img/skills/programs/figma.webp' , experience: '1 year'},
    {name: 'SkechtUp', image: 'img/skills/programs/sketchup.png' , experience: '8 years'},
    {name: 'Wordpress', image: 'img/skills/programs/wordpress.png' , experience: '3 years'},
    {name: 'Git', image: 'img/skills/programs/git.png'  , experience: '3 months'},
    {name: 'Github', image: 'img/skills/programs/github2.png' , experience: '3 months'},
    {name: 'Termius', image: 'img/skills/programs/termius.svg' , experience: '1 month'},
  ]

  const hardwares = [
    {name: 'PC', image: 'pc.png', image_hover: 'pc2.png', experience: 'build and repair'},
    {name: 'Apple iPhone', image: 'iphone.png', image_hover: 'iphone2.jpg', experience: 'service and repair'},
    {name: 'Desktop', image: 'desktop2.jpg', image_hover: 'desktop.png', experience: 'project and build'},
    {name: 'Leds RGB, aRGB', image: 'leds.jpg', image_hover: 'leds3.jpg', experience: 'implementation'},
    {name: 'Smart home', image: 'smarthome3.JPG', image_hover: 'smarthome2.JPG', experience: 'setting up'},
    {name: 'Soldering', image: 'soldering2.JPG', image_hover: 'soldering.JPG', experience: 'medium stage'},
    {name: '3D printing', image: '3dprinting4.JPG', image_hover: '3dprinting.JPG', experience: 'entry stage'},
    {name: 'Web and server', image: 'webserver2.jpg', image_hover: 'webserver3.jpg', experience: 'administration'},

  ]

  return (
    <section className='min-h-screen text-neutral-900 bg-[#e0e0e0] bg-cover bg-fixed flex flex-col items-center justify-center'>
        <motion.div 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: 100}}
        transition={{duration: 0.5}}
        className='w-full h-20 flex items-center justify-center text-5xl font-[Lexend-bold] uppercase text-[#4e4e4e] py-20 text-center'>Languages that I know</motion.div>
        <div className='flex flex-row flex-wrap gap-8 items-center justify-center px-[10%] pb-8 max-w-[1000px]'>
          {skills.map((skill, index) => (
              <Skill key={index} name={skill.name} image={skill.image} experience={skill.experience}/>
          ))}
        </div>

        <motion.div 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: 100}}
        className='w-full h-20 flex items-center justify-center text-5xl font-[Lexend-bold] uppercase text-[#4e4e4e] py-20 text-center'>Apps which I use</motion.div>
        <div className='flex flex-row flex-wrap gap-8 items-center justify-center px-[10%] pb-8 max-w-[1000px]'>
          {apps.map((app, index) => (
              <Skill key={index} name={app.name} image={app.image} experience={app.experience}/>
          ))}
        </div>

        <motion.div 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: 100}}
        className='w-full h-20 flex items-center justify-center text-5xl font-[Lexend-bold] uppercase text-[#4e4e4e] py-20 text-center'>and my hardware skills</motion.div>
        <div className='flex flex-row flex-wrap gap-8 items-center justify-center px-[10%] pb-8 max-w-[1000px]'>
          {hardwares.map((hardware, index) => (
              <Hardware key={index} name={hardware.name} image={hardware.image} image_hover={hardware.image_hover} experience={hardware.experience}/>
          ))}
        </div>
        
    </section>
  )
}