import React from "react";
import Title from "./Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Favourite from "./Favourite";
import EyeItem from "./EyeItem";
import AddToCart from "./AddToCart";
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Flashsales = ({ title, heading, products }) => {
  return (
    <div className="py-16 mt-10 bg-white">
      <Title title={title} heading={heading} />

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {products?.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="">
                <div
                  className="bg-secondaryColor rounded-md h-64 bg-no-repeat bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${product?.images?.[0]})` }}
                >
                  <div className="absolute right-4 top-5 flex flex-col gap-2">
                    <Favourite />
                    <EyeItem id={product?.id} />
                  </div>
                  <AddToCart>
                    <div className="absolute bottom-0 hover:bg-black w-full hover:text-white text-center text-sm p-2 cursor-pointer transition-all">
                      Add to cart
                    </div>
                  </AddToCart>
                </div>
                <h2 className="text-sm py-2">{product?.name}</h2>
                <div>
                  <span className="text-sm text-red-500 mr-2">Rs 500</span>
                  <span className="text-sm text-gray-500 line-through">
                    Rs {product?.price}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star
                    size={15}
                    className="text-yellow-500"
                    fill="rgb(250 204 21)"
                  />
                  <p className="ms-2 text-sm font-bold text-gray-900">4.95</p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                  <div className="text-sm font-medium text-gray-900 underline hover:no-underline">
                    32 reviews
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[75%] lg:left-[92%] top-[-25px] bg-slate-300" />
        <CarouselNext className="absolute right-0 top-[-25px] bg-slate-300" />
      </Carousel>
      <Link href="/" className="flex justify-center mt-10">
        <Button className="bg-red-600 text-white">
          View all products
          </Button>
      </Link>
    </div>
  );
};

export default Flashsales;
