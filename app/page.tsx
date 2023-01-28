import Image from 'next/image'
import TestLanding from '@components/test-landing'
import Navbar from '@components/navbar'
import Hero from '@components/hero'
import Skills from '@components/skills'
import Works from '@components/works'

export default function Home() {
  return (
    <section className='text-white overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Skills />
      <Works />
      <TestLanding />
    </section>
  )
}
