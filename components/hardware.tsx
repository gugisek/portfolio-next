import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    name: string,
    image: string,
    image_hover: string,
    experience: string
}

export default function Hardware({name, image, image_hover, experience}: Props) {
    
    const [hover, setHover] = React.useState(false)

  return (
    <motion.div 
    whileInView={{opacity: 1, scale: 1}}
    initial={{opacity: 0, scale: 0.5}}
    transition={{duration: 0.5}}
    className='flex flex-col items-center justify-center' 
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={() => setHover(!hover)}
    >
        <div className='hardwares sm:w-[170px] w-[140px] sm:h-[170px] h-[140px] flex items-center justify-center flex-col'>
                <img src={"img/skills/hardware/"+image_hover} alt={image_hover + " icon"} className={`sm:w-[170px] w-[140px] rounded-[20px] transition-all duration-300 ${hover ? 'opacity-100' : 'opacity-0 absolute'}`}/>
                <img src={"img/skills/hardware/"+image} alt={image + " icon"} className={`sm:w-[170px] w-[140px] rounded-[20px] transition-all duration-300 ${hover ? 'opacity-0 absolute' : 'opacity-100'}`}/>
        </div>
        <div className='flex items-center justify-center flex-row sm:w-[170px]'>
            <p className={`py-4 font-[Lexend-bold] transition-all duration-300 ${hover ? 'opacity-100' : 'opacity-0 absolute'}`}>{experience}</p>
            <p className={`py-4 font-[Lexend-bold] transition-all duration-300 ${hover ? 'opacity-0 absolute' : 'opacity-100'}`}>{name}</p>
       </div>
        
    </motion.div>
  )
}