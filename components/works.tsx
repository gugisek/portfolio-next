import React from 'react'

type Props = {}

export default function works({}: Props) {

  const projects = [
  {
    name: 'RGBpc.pl',
    description: "<p>Gaming shop fully customized <span style='color: #7b02ff'>woocomerce</span> shematic</p>                <li>fully working product pages</li>                <li>avaible variants</li>                <li>zooming photos</li>                <li>modernistic arhive style </li>            <p>                Promo codes and direct pay via <span style='color: #3013E1'>Gpay</span> and <span style='color: #000'>Apple Pay</span>                <br>                Working paynaments via <span style='color: #35A5E4'>PayPal</span> and <span style='color: #BE06FF'>Stripe</span>                <br>                Different shipping methods even <span style='color: #C99612'>InPost Paczkomat</span>           </p>",
    link: 'https://www.rgbpc.pl',
    github: '',
    image: 'rgbpc.png',
    technologies: 'HTML CSS JS PHP MySQL Wordpress Linux'
  },
  {
    name: 'praktyczny-informatyk.pl',
    description: "<p>                Website with <span style='color: #d800ff'>tutorials</span> for practical exams for IT.            </p>                <li>working search bar</li>                <li>sorting elements by date</li>                <li>download files from server</li>            <p>                Builded on subsites and folder with elements as objects in list on site.            </p>",
    link: 'https://www.praktyczny-informatyk.pl',
    github: '',
    image: 'praktyczny-informatyk.pl.png',
    technologies: 'HTML CSS JS PHP'
  }
  ]
  return (
    <section id="my-works" className='min-h-screen text-neutral-900 flex flex-col items-center justify-start'>
        <h1 className='uppercase font-[Lexend-bold] text-5xl text-[#e0e0e0] pb-16'>My projects</h1>
        {projects.map((project, index) => (
          <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex xl:flex-row flex-col md:w-3/5 sm:w-2/3 w-full sm:px-0 px-6 gap-10 items-center justify-center'>
              <div className='xl:w-1/2 md:w-1/2 w-full flex items-center justify-center'><img src={project.image} alt={project.name + " image"} className='shadow-2xl rounded-xl max-w-[350px]'/></div>
              <div className='flex flex-col justify-center xl:w-1/2 md:w-1/2 w-full'>
                <h1 className='font-[Lexend-bold] text-3xl py-6'>{project.name}</h1>
                <div className='font-[Lexend]'>
                  <span dangerouslySetInnerHTML={{__html: project.description}}></span>
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-4 mt-3'>
                  {project.link && (
                  <a href={project.link} className="btn">
                    website
                    <img src="website.png" alt="website icon" />
                  </a>
                  )}
                  {project.github && (
                  <a href={project.github} className="btn">
                    github
                    <img src="github.png" alt="github icon" className='w-[20px] h-[20px]'/>
                  </a>
                  )}
                </div>
            <p className='uppercase text-center py-7 sm:px-0 px-6 text-sm font-[Lexend] text-[#656565]' style={{wordSpacing: '15px'}}>{project.technologies}</p>
          </div>
        ))}

    </section>
  )
}