'use client'
import { toast } from '@/hooks/use-toast'
import { addFavourite } from '@/services/posts'
import { Heart } from 'lucide-react'
import React from 'react'

const Favourite = ({id}) => {
  const addToFavourite = async() => {
    const {result, error} = await addFavourite(id);

    if(result){
      toast({title: 'Product added in wishlist'})
    }else{
      toast({variant: 'destructive', title: error})
    }
  }
  return (
    <div 
    onClick={addToFavourite}
    className='flex justify-center items-center bg-white p-1.5 rounded-full cursor-pointer'>
        <Heart size={20} color='gray' className='border-0 hover:fill-red-500 hover:outline-none' />
    </div>
  )
}

export default Favourite