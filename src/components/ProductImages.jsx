'use client'
import React, { useState } from 'react'

const ProductImages = ({images}) => {
    const [image, setImage] = useState(images[0])
  return (
    <>
    <div className='flex flex-col gap-3 items-start'>
        {images?.map((img, index) =>(
            <button 
            key={index} 
            onClick={() => setImage(img)}
            className='border hover:border-gray-900 overflow-hidden transition-colors'
            >
                <img src={img} alt="product-img" height={100} width={100} className='aspect-square object-cover rounded-lg' />
            </button>
        ))}
    </div>

<div className="md:col-span-4">
    <img src={image} className='aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden' alt="img" />
</div>
    </>
  )
}

export default ProductImages