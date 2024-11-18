import React from 'react'
import { Separator } from './ui/separator'
import { CreditCard, CreditCardIcon, TruckIcon } from 'lucide-react'

const ChooseUs = () => {
  return (
    <div>
        <h2 className="text-center text-3xl font-bold">Why Choose Us?</h2>
        <div className="my-2 grid grid-cols-4 border bg-gray-50 gap-4 p-4 text-center rounded-md">
            <div className="flex flex-col items-center justify-center gap-2">
                <TruckIcon size={20} />
                <h2 className='font-semibold'>Fast Delivery</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing eli.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <CreditCardIcon size={20} />
                <h2 className='font-semibold'>Fast Delivery</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <TruckIcon size={20} />
                <h2 className='font-semibold'>Fast Delivery</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <TruckIcon size={20} />
                <h2 className='font-semibold'>Fast Delivery</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    </div>
  )
}

export default ChooseUs