import React from 'react'
import { CreditCardIcon, ShieldCheck, ShoppingBag, TruckIcon } from 'lucide-react'

const ChooseUs = () => {
  return (
    <div>
        <h2 className="text-center text-3xl font-bold mb-4">Why Choose Us?</h2>
        <div className="my-2 grid grid-cols-2 md:grid-cols-4 border bg-gray-50 gap-4 py-6 px-3 text-center rounded-md">
            <div className="flex flex-col items-center justify-center gap-2">
                <TruckIcon size={30} />
                <h2 className='font-bold text-lg'>Fast Delivery</h2>
                <p className='font-medium text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing eli.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <CreditCardIcon size={30} />
                <h2 className='font-bold text-lg'>Free Shipping</h2>
                <p className='font-medium text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <ShieldCheck size={30} />
                <h2 className='font-bold text-lg'>Secure Checkout</h2>
                <p className='font-medium text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <ShoppingBag size={30} />
                <h2 className='font-bold text-lg'>Easy Returns</h2>
                <p className='font-medium text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    </div>
  )
}

export default ChooseUs