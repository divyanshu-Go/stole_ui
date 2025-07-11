import React from 'react'
import FeaturedElementPreview from './FeaturedElementPreview'
import { getTopLikedElements } from '@/lib/api';

const FeaturedElements = async () => {

  const sampleElements = await getTopLikedElements();



  return (
    <section className="flex flex-col py-12 pb-[600px]">
      <h2 className="text-5xl text-start font-bold tracking-tighter mb-10">Featured Elements</h2>

      {/* Horizontal scrollable row */}
      <div className="overflow-x-hidden h-[600px] flex flex-col justify-center gap-8 absolute -left-4 translate-y-20" >
        <div className="flex gap-20 w-fit animate-scroll-left-right ">
          {sampleElements.map((el, index) => (
            <FeaturedElementPreview key={index} element={el} index={index}/>
          ))}
        </div>
        <div className="flex gap-20 w-fit animate-scroll-right-left">
          {sampleElements.map((el, index) => (
            <FeaturedElementPreview key={index} element={el} index={index}/>
          ))}
        </div>
      </div>

    </section>
  )
}

export default FeaturedElements
