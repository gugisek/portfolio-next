"use client"

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    name: string,
    description: string,
    link: string,
    github: string,
    image: string,
    technologies: string
}

export default function post({name, description, link, github, image, technologies}: Props) {
  return (
    <motion.div 
    initial={{opacity: 0, x: 100}}
    whileInView={{opacity: 1, x: 0}}
    transition={{duration: 1}}
    className='flex flex-col items-center justify-center w-full'>
            <div className='flex xl:flex-row flex-col md:w-3/5 sm:w-2/3 w-full sm:px-0 px-6 gap-10 items-center justify-center'>
              <div className='xl:w-1/3 md:w-2/3 w-full flex items-center xl:justify-end justify-center'><img src={image} alt={name + " image"} className='shadow-xl rounded-xl max-w-[350px]'/></div>
              <div className='flex flex-col justify-center xl:w-1/2 md:w-2/3 w-full'>
                <h1 className='font-[Lexend-bold] text-3xl py-6'>{name}</h1>
                <div className='font-[Lexend]'>
                  <span dangerouslySetInnerHTML={{__html: description}}></span>
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-4 mt-3'>
                  {link && (
                  <a href={link} className="btn">
                    website
                    <img src="website.png" alt="website icon" />
                  </a>
                  )}
                  {github && (
                  <a href={github} className="btn">
                    github
                    <img src="github.png" alt="github icon" className='w-[20px] h-[20px]'/>
                  </a>
                  )}
                </div>
            <p className='uppercase text-center py-7 sm:px-0 px-6 text-sm font-[Lexend] text-[#656565]' style={{wordSpacing: '15px'}}>{technologies}</p>
          </motion.div>
  )
}