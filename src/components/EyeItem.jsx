'use client';
import { toast } from '@/hooks/use-toast';
import { updateProductViews } from '@/services/posts';
import { Eye } from 'lucide-react'
import React from 'react'

const EyeItem = ({id}) => {
  const updateViews = async() => {
    const res = await updateProductViews(id);
    if(!id){
      toast({variant:'desctructive', title: res.error})
    }
  }
  return (
    <div onClick={updateViews} className='flex justify-center items-center bg-white p-1.5 rounded-full cursor-pointer'>
        <Eye size={20} color='gray' />
    </div>
  )
}

export default EyeItem