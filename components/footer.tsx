import React from 'react'

type Props = {}

export default function footer({}: Props) {
  return (
    <section className='bg-gradient-to-b from-[#e0e0e0] to-[#353535]'>
        <div className='h-[70vh]' style={{background: 'url(img/footer.svg)', backgroundSize: 'cover'}}></div>
        <p className='bg-[#3d3d3d] text-[#707070] font-[Lexend-light] text-center pb-8 text-sm'>designed and build by gugisek</p>
    </section>
  )
}