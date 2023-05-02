'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Tree from '@components/tree'
type Props = {}
export default function aboutme({}: Props) {
    const experiances = [
    {name: 'Międzynarodowe praktyki', description: 'web developer / robot constructor', place: 'Grecja Leptocaria', year: '2022', month: 'Październik', duration: '2 tygodnie'},
    {name: 'Egzamin kwalifikacyjny', description: 'INF-02 praktyczny 100% / teoria 96%', place: 'Zespół szkół nr 14 w Warszawie', year: '2022', month: 'Czerwiec', duration: ''},
    {name: 'Praktyki', description: 'helpdesk / serwisant / networker', place: '123i serwis komputerów / Wołomin', year: '2022', month: 'Maj', duration: '1 miesiąc'},
    {name: 'Szkoła średnia', description: 'technik informatyk', place: 'Zespół szkół nr 14 w Warszawie', year: '2019', month: 'Wrzesień', duration: 'Ciągle trwa'},
    ]
  return (
    <div id="o-mnie" className='min-h-[60vh] flex md:flex-row flex-col items-center justify-evenly text-neutral-900 md:px-[8%] px-[5%] md:py-0 py-20'>
        <section className='w-1/3 md:block hidden overflow-y-scroll h-[30vh]'>
            {experiances.map((experiance, index) => (
                <Tree key={index} name={experiance.name} description={experiance.description} place={experiance.place} year={experiance.year} month={experiance.month} duration={experiance.duration} />
            ))}
            {/* cv jeszcze dodać */}
        </section>
        <div className='flex justify-center items-center flex-col md:w-1/3 w-2/3'>
            <motion.a
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1, transition: {
                type: "spring",
                duration: 1
            }}}
            href='https://github.com/gugisek'
            target={'_blank'}
            ><img src="img/profile.jpg" alt="profile" className='rounded-full grayscale hover:grayscale-0 hover:shadow-xl transition-all duration-300'/></motion.a>
            <h1 className='text-2xl font-[Lexend-medium] py-2'>Gustaw Sołdecki</h1>
        </div>
        <motion.div 
        className='md:w-1/3 w-2/3 text-xl font-[Roboto-light]'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0, transition: {
                type: "animate",
                duration: 1
            }}}
            exit={{ opacity: 0, x: 100, transition: {
                type: "spring",
                duration: 1
            }}}
        >
        Mam 18 lat, uczęszczam do czwartej klasy w zespole szkół nr 14 w Warszawie na kierunku informatyk.
        <br /><br />
        Moją pasją jest programowanie, a w szczególności tworzenie stron internetowych. Również znajduję czas na naprawę sprzetu elektronicznego szczególnie upodobałem sobie naprawy sprzętu appla.
        </motion.div>
    </div>
  )
}