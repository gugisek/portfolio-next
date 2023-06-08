"use client"

import { NavBarPl, HeroPl, SkillsPl, WorksPl, ContactPl, FooterPl } from '@components'

export default function Pl() {
  return (
    
    <section className='text-white overflow-x-hidden'>
      <head>
        <meta name="description" content="Mam 18 lat, uczęszczam do czwartej klasy w zespole szkół nr 14 w Warszawie na kierunku informatyk. Moją pasją jest programowanie, a w szczególności tworzenie stron internetowych."/>
        <title>GuGiSeK - pasjonat branży IT</title>
        <link rel="icon" href="/img/faviconPL.png" />
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
