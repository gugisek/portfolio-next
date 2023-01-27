import Image from 'next/image'
import TestLanding from '@components/test-landing'
import Navbar from '@components/navbar'
import Hero from '@components/hero'
import Skills from '@components/skills'


export default function Home() {
  return (
    <section className='text-white'>
      <Navbar />
      <Hero />
      <Skills />
      <TestLanding />
    </section>
  )
}
