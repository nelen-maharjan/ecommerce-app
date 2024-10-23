import AddToCart from "@/components/AddToCart";
import Favourite from "@/components/Favourite";
import ProductImages from "@/components/ProductImages";
import prisma from "@/utils/connection";
import React from "react";

const ProductIdPage = async ({ params }) => {
  const product = await prisma?.product?.findUnique({
    where: { id: params?.productId },
  });
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-7xl px-4 mx-auto py-6">
      <div className="grid md:grid-cols-5 gap-3 items-start">
        {product?.images?.length ? (
          <ProductImages images={product?.images} />
        ) : null}
      </div>
      <div>
        <div>
          <h1 className="font-bold text-3xl lg:text-4xl">{product?.name}</h1>
          <span className="text-2xl text-gray-500 mt-6">
            Rs {product?.price}
          </span>
          
          <p className="text-slate-400 my-3">{product?.description}</p>
        </div>
        <hr className="h-[1px] w-full bg-slate-400 mt-5" />
        <div className="mt-5 alert-dialog flex gap-2">
          <AddToCart product={product}>
            <div className="bg-red-600 text-white text-center text-sm p-2 cursor-pointer w-full rounded-md">
              Add to Cart
            </div>
          </AddToCart>
          <Favourite />
        </div>
      </div>
    </div>
  );
};

export default ProductIdPage;
