"use client"

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    name: string,
    description: string,
    link: string,
    github: string,
    image1: string,
    image2: string,
    image3: string,
    technologies: string
}

export default function post({name, description, link, github, image1, image2, image3, technologies}: Props) {

  const [slideActive, setSlideActive] = React.useState(0)

  return (
    <motion.div 
    initial={{opacity: 0, x: 100}}
    whileInView={{opacity: 1, x: 0}}
    transition={{duration: 1}}
    className='flex flex-col items-center justify-center w-full'>
            <div className='flex xl:flex-row flex-col md:w-3/5 sm:w-2/3 w-full sm:px-0 px-6 gap-10 items-center justify-center mt-3'>
              <div className='xl:w-4/5 md:w-2/3 w-full max-w-[350px] flex flex-col items-center xl:justify-end justify-center'>
                <div className='flex items-center justify-center'>
                  <img id="slides" src={"img/posts/"+image1} alt={name + " image"} className={`${slideActive==0 ? 'opacity-100' : 'opacity-0 absolute'} shadow-xl rounded-xl max-w-[350px] z-0`}/>
                  <img id="slides" src={"img/posts/"+image2} alt={name + " image"} className={`${slideActive==1 ? 'opacity-100' : 'opacity-0 absolute'} shadow-xl rounded-xl max-w-[350px] z-0`}/>
                  <img id="slides" src={"img/posts/"+image3} alt={name + " image"} className={`${slideActive==2 ? 'opacity-100' : 'opacity-0 absolute'} shadow-xl rounded-xl max-w-[350px] z-0`}/>
                </div>
                <div className='flex felx-row z-10 mt-[-5px]'>
                  <div>
                    <button onClick={() => setSlideActive(0)} className="py-3" >
                      <div className={`${slideActive==0 ? 'bg-[#4d4d4d]' : 'bg-[#9c9c9c]'} w-6 h-[3px] rounded-full mx-1 transition-all duration-300`}></div>
                    </button>
                  </div>
                  <div>
                    <button onClick={() => setSlideActive(1)} className="py-3">
                      <div className={`${slideActive==1 ? 'bg-[#4d4d4d]' : 'bg-[#9c9c9c]'} w-6 h-[3px] rounded-full mx-1 transition-all duration-300`}></div>
                    </button>
                  </div>
                  <div>
                    <button onClick={() => setSlideActive(2)} className="py-3">
                      <div className={`${slideActive==2 ? 'bg-[#4d4d4d]' : 'bg-[#9c9c9c]'} w-6 h-[3px] rounded-full mx-1 transition-all duration-300`}></div>
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-center xl:w-2/4 md:w-2/3 w-full mt-[-15px]'>
                <h1 className='font-[Lexend-bold] text-3xl pb-3 flex items-center justify-between'>
                  {name}
                  <span className='flex flex-row'>
                    {link && (
                    <a href={link} className="btnMini flex items-center justify-center p-2 mx-2" target='_blank'>
                      <img src="img/buttons/website.png" alt="website icon" className='w-[20px] h-[20px]'/>
                    </a>
                    )}
                    {github && (
                    <a href={github} className="btnMini flex items-center justify-center p-2 mx-2" target='_blank'>
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
            
            <p className='uppercase text-center pb-7 pt-1 sm:px-0 px-6 text-sm font-[Lexend] text-[#656565]' style={{wordSpacing: '15px'}}>{technologies}</p>
          </motion.div>
  )
}