"use client"; // aby się nie wywalało na server side rendering

import React from 'react'
import { motion } from 'framer-motion'
type Props = {}

export default function Navbar({}: Props) {

    const [active, setActive] = React.useState(false);

    const links2 = [
        {name: 'about me', href: '#about-me'},
        {name: 'my works', href: '#my-works'},
        {name: 'contact', href: '#contact'},
   ];

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
        <div className='text-neutral-900 font-light flex items-center justify-between py-9 md:px-[11%] px-[5%]'>
            <div className='flex flex-row gap-5 '>
                <a href="/" className='text-2xl hover:text-white transition-all duration-300'>hello
                <span className='text-sm ml-1'>English</span>
                </a>
                <a href="/" className='text-2xl hover:text-white transition-all duration-300'>cześć
                <span className='text-sm ml-1'>Polski</span>
                </a>
            </div>
            <div className='flex-row gap-10 text-2xl font-light hidden md:flex'>
                <a href="#about-me" className='hover:text-white transition-all duration-300'>about me</a>
                <a href="#my-works" className='hover:text-white transition-all duration-300'>my works</a>
                <a href="#contact" className='hover:text-white transition-all duration-300'>contact</a>
            </div>
            <div className='flex md:hidden z-10'>
                <div onClick={() => setActive(!active)} className="w-[40px] h-[40px] flex justify-center items-center md:hidden">
                    <div id="hamburger" className={`${active ? 'bg-[#fff0] before:rotate-45 before:translate-y-[0px] after:rotate-[-45deg] after:translate-y-[0px] fixed' : 'bg-[#3d3d3d] before:translate-y-[10px] after:translate-y-[-10px]'} block before:bg-[#3d3d3d]  after:bg-[#3d3d3d] `} ></div>
                </div>
            </div>
        </div>
        <div className={`fixed flex items-center justify-center gap-4 flex-col h-screen md:hidden bg-white top-0 transition-all duration-300 w-screen ${active ? 'right-0' : 'right-[-100vw]'}`}>
                {links2.map((link, index) => (
                    <motion.a 
                    key={index} 
                    href={link.href} 
                    className="block text-center text-3xl text-[#3d3d3d] hover:text-[#456edd] px-10 py-1 transition duration-300"
                    onClick={() => setActive(!active)}
                    initial={{ opacity: 0}}
                    whileInView={{ opacity: 1, transition: {
                        type: "spring",
                        duration: 0.5
                    }}}
                    exit={{ opacity: 0, transition: {
                        type: "spring",
                        duration: 0.5
                    }}}
                    >
                        {link.name}
                    </motion.a>
                ))}
        </div>
    </motion.section>
  )
}