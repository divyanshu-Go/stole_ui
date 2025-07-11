import React from 'react'

const HeroSection = () => {
  return (
    <section className=" w-full flex flex-col">
      <video
        className="absolute top-0 left-0 w-full h-1/2 object-cover mix-blend-lighten -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="sparkle.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className=" h-52 w-full bg-[var(--background)] absolute left-0 top-1/2 -translate-y-28 blur-2xl"></div>

      <div className=" py-40 flex flex-col items-center gap-4 text-center ">
        <h1 className="text-[var(--secondary-fg)] text-shadow text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Free CSS Elements For
          <br/>
          Modern Web Development
        </h1>
        <p className="font-extralight text-[var(--secondary-fg-small)] leading-normal text-sm sm:text-[1.1rem] -tracking-tighter mt-5" >
          Discover and share beautiful CSS components. Build modern websites <br/> faster with free UI
          elements.
        </p>
      </div>    
    </section>
  )
}

export default HeroSection
