"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Skill from './skill'
import Hardware from './hardware'

type Props = {}

export default function skills({}: Props) {

  const skills = [
    {name: 'HTML', image: 'html.svg', experience: '4 years'},
    {name: 'CSS', image: 'css.svg', experience: '4 years'},
    {name: 'PHP', image: 'php.svg' , experience: '3 years'},
    {name: 'MySQL', image: 'mysql.png' , experience: '3 years'},
    {name: 'JavaScript', image: 'javascript.png' , experience: '2 years'},
    {name: 'React', image: 'react.png'  , experience: '3 months'},
    {name: 'Next.js', image: 'next.png' , experience: '3 months'},
    {name: 'Tailwind CSS', image: 'tailwindcss.png' , experience: '3 months'},
    {name: 'Framer Motion', image: 'framer-motion.svg' , experience: '1 month'},
  ]

  const apps = [
    {name: 'VS Code', image: 'vscode.png', experience: '3 years'},
    {name: 'Adobe PremiePro', image: 'premierepro.png', experience: '3 years'},
    {name: 'Gimp', image: 'gimp.png' , experience: '6 years'},
    {name: 'Figma', image: 'figma.webp' , experience: '1 year'},
    {name: 'SkechtUp', image: 'sketchup.png' , experience: '8 years'},
    {name: 'Wordpress', image: 'wordpress.png' , experience: '3 years'},
    {name: 'Git', image: 'git.png'  , experience: '3 months'},
    {name: 'Github', image: 'github2.png' , experience: '3 months'},
    {name: 'Termius', image: 'termius.svg' , experience: '1 month'},
  ]

  const hardwares = [
    {name: 'PC', image: 'pc.png', image_hover: 'pc2.png', experience: 'build and repair'},
    {name: 'Apple iPhone', image: 'iphone.png', image_hover: '', experience: 'service and repair'},
    {name: 'Desktop', image: 'desktop.png', image_hover: '', experience: 'project and build'},
    {name: 'Leds RGB, aRGB', image: 'leds.png', image_hover: '', experience: 'implementation'},
    {name: 'Smart home', image: 'smarthome.png', image_hover: '', experience: 'setting up'},
    {name: 'Soldering', image: 'soldering.png', image_hover: '', experience: 'medium stage'},
    {name: '3D printing', image: '3dprinting.png', image_hover: '', experience: 'entry stage'},
    {name: 'Web and server', image: 'webserver.png', image_hover: '', experience: 'administartion'},

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