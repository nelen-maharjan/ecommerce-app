'use client'
import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import autoplay from 'embla-carousel-autoplay'
import { profile } from '@/utils/data'

const Carousels = () => {
  return (
    <div className='relative overflow-x-hidden'>
      <Carousel
        plugins={[
          autoplay({
            delay: 2000
          })
        ]}
      >
        <CarouselContent className='ml-0 h-[30vh] md:h-[80vh]'>
          {profile.map((item, index) => (
            <CarouselItem key={index}
              style={{ backgroundImage: `url(${item.img})` }}
              className='w-full h-full bg-cover bg-center pt-5 bg-no-repeat relative pointer-events-none'
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] bg-black/40 opacity-80"></div>
              {/* Centering Text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <Card className='bg-transparent border-none'>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                      <p className='text-white text-sm md:text-4xl'>
                        {item.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Carousels
