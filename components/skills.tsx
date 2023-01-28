import React from 'react'

type Props = {}

export default function skills({}: Props) {
  return (
    <section className='min-h-screen text-neutral-900 bg-gray-200 bg-cover bg-fixed' style={{backgroundImage: 'url(bg.svg)'}}>
        <div className='w-full h-20 flex items-center justify-center text-2xl font-light'>My skills</div>
    </section>
  )
}