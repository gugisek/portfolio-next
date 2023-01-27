import { url } from 'inspector'
import React from 'react'

type Props = {}

export default function hero({}: Props) {
  return (
    <section style={{backgroundImage: 'url(bg.jpg)', backgroundPositionY:'44%', backgroundPositionX: 'center'}} className='bg-cover'>    
        <section className='min-h-screen text-neutral-900 flex justify-center items-center bg-cover flex-col' >
            <div className='font-[Roboto-normal]'>
                <p className='text-2xl font-[Roboto-light]'>Hi</p>
                <h1 className='text-4xl'>I'm Gustawo</h1>
            </div>
            <div className='absolute bottom-8 font-light'>
                scroll for more
            </div>
        </section>
        <section className='h-[50vh]'>hujebuje dzikie wensze</section>
    </section>

  )
}