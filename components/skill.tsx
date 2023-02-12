import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    name: string,
    image: string,
    experience: string
}

export default function skill({name, image, experience}: Props) {
    
    const [hover, setHover] = React.useState(false)

  return (
    <motion.div 
    whileInView={{opacity: 1, scale: 1}}
    initial={{opacity: 0, scale: 0.5}}
    transition={{duration: 0.5}}
    className='flex flex-col items-center justify-center' 
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={() => setHover(!hover)}>
        
        <div className='skills sm:w-[150px] w-[100px] sm:h-[150px] h-[100px] flex items-center justify-center flex-col'>
            <img src={image} alt={image + " icon"} className='sm:w-[100px] w-[70px]'/>
        </div>
        <div className='flex items-center justify-center flex-row'>
            <p className={`py-4 font-[Lexend-bold] transition-all duration-300 ${hover ? 'opacity-100' : 'opacity-0 absolute'}`}>{experience}</p>
            <p className={`py-4 font-[Lexend-bold] transition-all duration-300 ${hover ? 'opacity-0 absolute' : 'opacity-100'}`}>{name}</p>
       </div>
        
    </motion.div>
  )
}