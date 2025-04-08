import React from 'react'
import SearchBox from './SearchBox'

const HeroSection = () => {
  return (
    <section className="-mt-14 pb-72 w-full flex flex-col items-center relative">
      <video
        className="btm-feather absolute top-0 left-0 w-full h-full object-cover mix-blend-lighten -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="sparkle2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="h-52 w-full bg-[var(--background)] absolute -bottom-20 blur-2xl"></div>

      <div className=" py-40 flex flex-col items-center gap-4 text-center ">
        <h1 className="text-[var(--secondary-fg)] text-shadow text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Free CSS Elements For
          <br/>
          Modern Web Development
        </h1>
        <p className="  font-extralight text-[var(--secondary-fg-small)] leading-normal text-sm sm:text-[1.1rem] -tracking-tighter mt-5" >
          Discover and share beautiful CSS components. Build modern websites <br/> faster with free UI
          elements.
        </p>
      </div>    
    </section>
  )
}

export default HeroSection
