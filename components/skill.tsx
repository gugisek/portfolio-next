"use client"
import React from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
    name: string,
    image: string,
    experience: string,
    level?: number,
    index?: number
}

export default function Skill({name, image, experience, level, index = 0}: Props) {
    const x = useMotionValue(0.5)
    const y = useMotionValue(0.5)
    const springX = useSpring(x, { stiffness: 200, damping: 20 })
    const springY = useSpring(y, { stiffness: 200, damping: 20 })
    const rotateX = useTransform(springY, [0, 1], [9, -9])
    const rotateY = useTransform(springX, [0, 1], [-9, 9])
    const sheenX = useTransform(x, (value) => `${value * 100}%`)
    const sheenY = useTransform(y, (value) => `${value * 100}%`)
    const sheen = useMotionTemplate`radial-gradient(180px circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.7), transparent 70%)`

    function handleMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left) / rect.width)
        y.set((event.clientY - rect.top) / rect.height)
    }

    function handleLeave() {
        x.set(0.5)
        y.set(0.5)
    }

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: (index % 5) * 0.05 }}
    className='w-[calc(50%-0.75rem)] sm:w-[170px] [perspective:800px]'
    >
        <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className='neu-raised group relative rounded-[24px] px-4 pt-5 pb-4 flex flex-col items-center transition-shadow duration-500'
        >
            <motion.div
            aria-hidden
            style={{ background: sheen }}
            className='pointer-events-none absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500'
            />

            <div className='neu-well relative w-[92px] h-[92px] sm:w-[100px] sm:h-[100px] rounded-[22px] flex items-center justify-center transition-shadow duration-500'>
                <img
                src={image}
                alt={name + " icon"}
                className='w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.12] group-hover:-translate-y-1 group-hover:drop-shadow-[0_10px_12px_rgba(0,0,0,0.22)]'
                />
            </div>

            <p className='relative mt-4 font-[Lexend-bold] text-[15px] text-[#3d3d3d] text-center leading-tight'>{name}</p>

            <div className='relative mt-3 w-full flex items-center gap-2.5'>
                <div className='neu-track h-[7px] flex-1 rounded-full overflow-hidden'>
                    <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.round((level ?? 1) * 100)}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + (index % 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className='h-full rounded-full bg-gradient-to-r from-[#8a8a8a] to-[#3d3d3d]'
                    />
                </div>
                <span className='shrink-0 text-[11px] font-[Lexend-medium] text-[#6b6b6b] tabular-nums'>{experience}</span>
            </div>
        </motion.div>
    </motion.div>
  )
}
