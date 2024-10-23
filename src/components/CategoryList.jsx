import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Title from "./Title";
import Link from "next/link";

const CategoryList = ({categories}) => {
  return (
    <div>
      <Title title="Category" heading="Browse By Category" />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {categories?.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <Link href={`/products?cat=${cat.id}`}>
                <div
                  className="border-2 bg-secondaryColor rounded-md h-40 flex justify-center items-center flex-col gap-2 ">
                    <img src={cat?.image} alt="category" className="w-20 h-20" />
                    <h2>{cat?.name}</h2>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[75%] lg:left-[92%] top-[-25px] bg-slate-300" />
        <CarouselNext className="absolute right-0 top-[-25px] bg-slate-300" />
      </Carousel>
    </div>
  );
};

export default CategoryList;
