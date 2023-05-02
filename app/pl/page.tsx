"use client"

import { NavBarPl, HeroPl, SkillsPl, WorksPl, ContactPl, FooterPl } from '@components'

export default function Pl() {
  return (
    
    <section className='text-white overflow-x-hidden'>
      <head>
        <title>GuGiSeK - pasjonat branży IT</title>
      </head>
      <div>
        <NavBarPl />
        <HeroPl />
        <SkillsPl />
        <WorksPl />
        <ContactPl />
        <FooterPl />
      </div>
    </section>
  )
}
