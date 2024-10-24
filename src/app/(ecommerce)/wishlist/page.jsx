import Flashsales from '@/components/Flashsales';
import prisma from '@/utils/connection'
import React from 'react'

const WishlistPage = async () => {
    const [wishlist, popularProducts] = await prisma?.$transaction([
        prisma?.favourite?.findMany({
            include: {product:true}
        }),
        prisma?.product?.findMany({take:6, skip:0, orderBy: {views:'desc'}})
      ]);


  return (
    <div className='px-[10%] my-[-5%]'>
        <Flashsales 
        title="Wishlist" 
        heading="Your favourite products" 
        products={wishlist} 
        />
        <Flashsales 
        title="Popular products" 
        heading="Most popular products" 
        products={popularProducts} 
        />
    </div>
  )
}

export default WishlistPage