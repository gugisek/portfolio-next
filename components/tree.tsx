"use client"

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    name: string,
    description: string,
    place: string,
    year: string,
    month: string,
    duration: string
}

export default function tree({name, description, place, year, month, duration}: Props) {
  return (
    <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0, transition: {
            duration: 1
        }}}
    className='flex flex-row pr-1 w-100'>
        <div className='text-right w-[20%]'>
            <p className='font-[Lexend-bold] text-xl text-[#8e8e8e] p-0'>{year}</p>
            <p className='text-sm text-[#8e8e8e] p-0 mt-[-5px]'>{month}</p>
        </div>
        <div className='w-[1px] bg-[#565656] mx-3 mb-7'></div>
        <div className='w-[60%]'>
            <h1 className='font-[Lexend-bold] text-[#565656] xl:text-2xl text-xl'>{name}</h1>
            <p>{place}</p>
            <p className='font-[Lexend-bold] text-sm text-[#757575]'>{description}</p>
            <p className='text-right w-full text-xs text-[#8e8e8e] py-2'>{duration}</p>
        </div>
    </motion.div>
  )
}