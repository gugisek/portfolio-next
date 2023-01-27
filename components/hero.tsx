"use client"
import AboutMe from 'components/about-me'
import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

export default function hero({}: Props) {
  return (
    <section style={{backgroundImage: 'url(bg.jpg)', backgroundPositionY:'44%', backgroundPositionX: 'center'}} className='bg-cover'>    
        <section className='min-h-screen text-neutral-900 flex justify-center items-center bg-cover flex-col' >
            <motion.div 
            className='font-[Roboto-normal]'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
                <p className='text-2xl font-[Roboto-light]'>Hi</p>
                <h1 className='text-4xl'>I'm Gustawo</h1>
            </motion.div>
            <motion.div 
            className='absolute bottom-8 font-light'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0, transition: {
                type: "spring",
                duration: 1
            }}}
            exit={{ opacity: 0, y: 100, transition: {
                type: "spring",
                duration: 1
            }}}
            >
                <a href='#about-me' className='hover:text-white transition-all duration-300'>scroll for more</a>
            </motion.div>
        </section>
        <AboutMe/>
    </section>

  )
}