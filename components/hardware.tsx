import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    name: string,
    image: string,
    image_hover: string,
    experience: string
}

export default function hardware({name, image, image_hover, experience}: Props) {
    
    const [hover, setHover] = React.useState(false)

  return (
    <motion.div 
    whileInView={{opacity: 1, scale: 1}}
    initial={{opacity: 0, scale: 0.5}}
    transition={{duration: 0.5}}
    className='flex flex-col items-center justify-center' 
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}>
        <div className='skills sm:w-[150px] w-[100px] sm:h-[150px] h-[100px] flex items-center justify-center flex-col'>
            {hover ? (
                <motion.img whileInView={{opacity: 1,}} initial={{opacity: 0}} transition={{duration: 0.5}} src={image_hover} alt={image_hover + " icon"} className='sm:w-[150px] w-[100px] rounded-[20px]'/>
            ) : (
                <img src={image} alt={image + " icon"} className='sm:w-[150px] w-[100px] rounded-[20px]'/>
            )}
        </div>
        {hover ? (
            <motion.p 
            whileInView={{opacity: 1}}
            initial={{opacity: 0}}
            transition={{duration: 1}}
            className='py-4 font-[Lexend-bold]'>{experience}</motion.p>
        ) : (
            <p 
            className='py-4 font-[Lexend-bold]'>{name}</p>
        )}
        
    </motion.div>
  )
}