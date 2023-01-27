import Image from 'next/image'
import TestLanding from '@components/test-landing'
import Navbar from '@components/navbar'
import Hero from '@components/hero'


export default function Home() {
  return (
    <section className='text-white'>
      <Navbar />
      <Hero />
      <TestLanding />
    </section>
  )
}
