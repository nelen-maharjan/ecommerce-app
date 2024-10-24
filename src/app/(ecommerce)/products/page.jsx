import Flashsales from '@/components/Flashsales'
import prisma from '@/utils/connection';
import React from 'react'

const ProductsPage = async({searchParams}) => {
    let result;
    if(searchParams.cat){
        result = await prisma.product.findMany({
            where:{categoryId: searchParams.cat}
        })
    }else{
        result = await prisma?.product.findMany();
    }
  return (
    <div className='px-[10%] my-[-5%]'>
        <Flashsales 
        title={`Products By Category`} 
        heading="Explore Our Products" 
        products={result}
        />
    </div>
  )
}

export default ProductsPage