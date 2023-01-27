"use client"; // aby się nie wywalało na server side rendering

import React from 'react'
import { motion } from 'framer-motion'
type Props = {}

export default function Navbar({}: Props) {
  return (
    <motion.section
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0, transition: {
            type: "spring",
            duration: 1
        }}}
        exit={{ opacity: 0, y: -100, transition: {
            type: "spring",
            duration: 1
        }}}
        className='w-full absolute z-50'
    >
        <div className='text-neutral-900 font-light flex items-center justify-between py-9 px-[12%]'>
            <div className='flex flex-row gap-5'>
                <a href="/" className='text-2xl'>hello
                <span className='text-sm ml-1'>English</span>
                </a>
                <a href="/" className='text-2xl'>cześć
                <span className='text-sm ml-1'>Polski</span>
                </a>
            </div>
            <div className='flex flex-row gap-10 text-2xl font-light'>
                <a href="/about-me">about me</a>
                <a href="/my-works">my works</a>
                <a href="/contact">contact</a>
            </div>
        </div>
    </motion.section>
  )
}