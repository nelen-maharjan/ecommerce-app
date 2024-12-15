'use client';
import { toast } from '@/hooks/use-toast';
import { confirmOrder } from '@/services/orders';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);  // Use state to hold orderId
  const [loading, setLoading] = useState(true); // Loading state for handling async behavior

  // Ensure the orderId is available from the URL query params
  useEffect(() => {
    if (router.query && router.query.orderId) {
      setOrderId(router.query.orderId);  // Set orderId when available
    }
  }, [router.query]);  // Dependency on router.query to update orderId

  // Guard clause if orderId is not yet available
  if (!orderId) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-yellow-500 text-center text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const updateOrder = async () => {
    try {
      const update = await confirmOrder(orderId);
      if (update.error) {
        toast({ variant: 'destructive', title: update.error });
      } else {
        toast({ variant: 'success', title: 'Order confirmed successfully!' });
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error confirming order' });
      console.error(error);
    }
  };

  // Run the order update once the orderId is available
  useEffect(() => {
    if (orderId) {
      updateOrder();
    }
  }, [orderId]);  // Run updateOrder only when orderId changes

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <>
          <Image
            src="https://i.gifer.com/7efs.gif"
            width={350}
            height={350}
            alt="tick-gif"
            unoptimized
            className="mx-auto"
          />
          <p className="text-green-500 text-center text-lg">
            Your payment is successful. Thank you for your purchase.
          </p>
        </>
      </div>
    </div>
  );
};

export default SuccessPage;
