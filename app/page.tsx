"use client"

import { NavBar, Hero, Skills, Works, Contact, Footer } from '@components'

export default function Home() {
  return (
    <section className='text-white overflow-x-hidden'>
      <NavBar />
      <Hero />
      <Skills />
      <Works />
      <Contact />
      <Footer />
    </section>
  )
}
