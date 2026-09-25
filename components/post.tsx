"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Gallery from '@components/gallery'

type Props = {
    name: string,
    description: string,
    link: string,
    github: string,
    images?: string[],
    image1?: string,
    image2?: string,
    image3?: string,
    technologies: string
}

export default function Post({name, description, link, github, images, image1, image2, image3, technologies}: Props) {

  const gallery = images ?? [image1, image2, image3].filter((img): img is string => !!img)

  return (
    <motion.div 
    initial={{opacity: 0, x: 100}}
    whileInView={{opacity: 1, x: 0}}
    transition={{duration: 1}}
    className='flex flex-col items-center justify-center w-full'>
            <div className='flex xl:flex-row flex-col md:w-3/5 sm:w-2/3 w-full sm:px-0 px-6 gap-10 items-center justify-center mt-3'>
              <div className='xl:w-4/5 md:w-2/3 w-full max-w-[460px] flex flex-col items-center xl:justify-end justify-center'>
                <div className="works-tray w-full rounded-[26px] p-2.5 sm:p-3 pb-1 sm:pb-1">
                  <Gallery images={gallery} alt={name} />
                </div>
              </div>
              <div className='flex flex-col justify-center xl:w-2/4 md:w-2/3 w-full mt-[-15px]'>
                <h1 className='font-[Lexend-bold] text-3xl pb-3 flex items-center justify-between'>
                  {name}
                  <span className='flex flex-row gap-2'>
                    {link && (
                    <a href={link} className="btnMini flex items-center justify-center min-w-[40px] min-h-[40px]" target='_blank' rel="noreferrer">
                      <img src="img/buttons/website.png" alt="website icon" className='w-[20px] h-[20px]'/>
                    </a>
                    )}
                    {github && (
                    <a href={github} className="btnMini flex items-center justify-center min-w-[40px] min-h-[40px]" target='_blank' rel="noreferrer">
                      <img src="img/buttons/github.png" alt="github icon" className='w-[20px] h-[20px]'/>
                    </a>
                    )}
                  </span>
                </h1>
                <div className='font-[Lexend]'>
                  <span dangerouslySetInnerHTML={{__html: description}}></span>
                </div>
                {/* <div className='flex flex-row gap-4 my-2'>
                  {link && (
                  <a href={link} className="btn" target='_blank'>
                    website
                    <img src="website.png" alt="website icon" />
                  </a>
                  )}
                  {github && (
                  <a href={github} className="btn" target='_blank'>
                    github
                    <img src="github.png" alt="github icon" className='w-[20px] h-[20px]'/>
                  </a>
                  )}
                </div> */}
              </div>
              
            </div>
            
            <ul className='flex flex-wrap justify-center gap-2.5 pb-10 pt-5 sm:px-0 px-6'>
              {technologies.split(/\s+/).filter(Boolean).map((technology) => (
                <li key={technology} className='works-chip rounded-full px-3.5 py-1.5 uppercase text-xs tracking-wider font-[Lexend] text-[#656565]'>{technology}</li>
              ))}
            </ul>
          </motion.div>
  )
}