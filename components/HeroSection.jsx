import React from 'react'

const HeroSection = () => {
  return (
    <section className="container py-24 sm:py-32 relative">
      <img src="hero.png" className="absolute -z-10" alt="" />
      <div className=" py-20 flex flex-col items-center gap-4 text-center">
        <h1 className=" bg-gray-900 blurred-bg text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
          Free CSS Elements for
          <br className="hidden sm:inline " />
          Modern Web Development
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Discover and share beautiful CSS components. Build modern websites faster with free UI
          elements.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
