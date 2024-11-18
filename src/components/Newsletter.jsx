'use client';

import Image from 'next/image';
import React from 'react';
import FormInput from './FormInput';
import { Button } from './ui/button';

const Newsletter = () => {
  return (
    <div className='my-8 flex gap-6'>
        {/* left */}
        <div>
            <Image src={'/wholesale-electronics.jpeg'} width={550} height={400} alt='electronics' />
        </div>
        {/* right */}
        <div className='flex flex-col'>
            <h2 className='text-xl font-bold uppercase mb-3'>Subscribe to our newsletter</h2>
            <p className='font-medium text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam modi molestias quas voluptatem porro minus velit nesciunt sit.</p>
            <div className='grid grid-cols-[2fr_1fr] mt-10'>
                <FormInput
                    type={'email'}
                    placeholder={'Enter your email address'}
                    className='flex-grow focus:outline-none '
                />
                <Button type='submit' className='ml-2'>Subscribe</Button>
            </div>
        </div>
    </div>
  );
}

export default Newsletter;
