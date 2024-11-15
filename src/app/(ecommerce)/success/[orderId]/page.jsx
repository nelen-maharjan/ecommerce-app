'use client'
import { toast } from '@/hooks/use-toast';
import { confirmOrder } from '@/services/orders';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const SuccessPage = ({params}) => {
  const {orderId} = params;
  const router = useRouter()

  const updateOrder = async() => {
    if(params.orderId){
      const update = await confirmOrder(orderId);
      if(update.error){
        toast({variant: 'destructive', title: update.error})
      }else{
        setTimeout(()=>{
        router.push('/');
        }, 5000);
      }
    }
  };

  useEffect(() => {
    updateOrder();
  }, [])
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50'>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <>
          <Image src='https://i.gifer.com/7efs.gif' width={350} height={350} alt='tick-gif' unoptimized className='mx-auto' />
          <p className="text-green-500 text-center text-lg">
             Your Payment is successful. Thankyou for your purchase.
          </p>
        </>
      </div>
    </div>
  )
}

export default SuccessPage