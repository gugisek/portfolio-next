import Image from 'next/image'
import TestLanding from '@components/test-landing'
import { Lexend } from '@next/font/google'

const inter = Lexend({ subsets: ['latin'] })

export default function Home() {
  return (
    <section style={inter.style} className='bg-black text-white'>
      <TestLanding />
    </section>
  )
}
