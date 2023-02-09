import React from 'react'

type Props = {
    name: string,
    description: string,
    place: string,
    year: string,
    month: string,
    duration: string
}

export default function tree({name, description, place, year, month, duration}: Props) {
  return (
    <div className='flex flex-row'>
        <div className='text-right'>
            <p className='font-[Lexend-bold] text-xl text-[#8e8e8e] p-0'>{year}</p>
            <p className='text-sm text-[#8e8e8e] p-0 mt-[-5px]'>{month}</p>
        </div>
        <div className='h-[100%] w-[2px] bg-[#565656] mx-3'></div>
        <div>
            <h1 className='font-[Lexend-bold] text-[#565656] text-2xl'>{name}</h1>
            <p>{place}</p>
            <p className='font-[Lexend-bold] text-sm text-[#757575]'>{description}</p>
            <p className='text-right w-full text-xs text-[#8e8e8e] py-2'>{duration}</p>
        </div>
    </div>
  )
}