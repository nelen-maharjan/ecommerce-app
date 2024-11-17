import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ImageList = ({ images }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-40 h-40 max-w-xs relative"
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <div >
              <Image src={image} alt="category" width={160} height={160} className="object-contain" />
              <h2></h2>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 h-7 w-7 bg-slate-300" />
      <CarouselNext className="absolute right-2 h-7 w-7 bg-slate-300" />
    </Carousel>
  );
};

export default ImageList;
