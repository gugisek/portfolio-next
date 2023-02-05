import React from 'react'

type Props = {}

export default function works({}: Props) {

  const projects = [
    {name: 'RGBpc.pl',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.',
    link: 'https://www.rgbpc.pl',
    github: '',
    image: 'rgbpc.png',
    technologies: 'HTML CSS JS PHP MySQL Wordpress Linux'
  },
  ]
  return (
    <section id="my-works" className='min-h-screen text-neutral-900 flex flex-col items-center justify-start'>
        <h1 className='uppercase font-[Lexend-bold] text-5xl text-[#e0e0e0] py-16'>My projects</h1>

        {projects.map((project, index) => (
          <div className='flex flex-col items-center justify-center'>
            <div className='flex xl:flex-row flex-col md:w-1/2 sm:w-2/3 w-full gap-10'>
              <div className='w-1/2 flex items-center justify-center'><img src={project.image} alt={project.name + " image"} className='shadow-2xl rounded-xl'/></div>
              <div className='flex flex-col justify-center w-1/2'>
                <h1 className='font-[Lexend-bold] text-3xl py-6'>{project.name}</h1>
                <p>
                  {project.description}
                </p>
                <div className=''>
                  <a href={project.link}></a>
                  <a href={project.github}></a>
                </div>
              </div>
            </div>
            <p className='uppercase py-7 font-[Lexend] text-[#656565]' style={{wordSpacing: '15px'}}>{project.technologies}</p>
          </div>
        ))}

    </section>
  )
}