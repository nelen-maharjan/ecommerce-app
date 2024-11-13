"use server";

import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CryptoJS = require("crypto-js");

export const createOrder = async (formData, cart) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  console.log('Form Data:', formData);
  console.log('Cart:', cart);

  const address = formData.get("address");
  const state = formData.get("state");
  const city = formData.get("city");
  const country = formData.get("country");
  const pinCode = parseInt(formData.get("pinCode"));
  const PhoneNo = parseInt(formData.get("phoneNo"));
  const paymentMethod = formData.get("payment_method");

  if (!address || !state || !city || !country || !pinCode || !PhoneNo) {
    return { error: "Please fill all fields" };
  }

  try {
    const cartDetails = cart?.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      };
    });

    console.log('Cart Details:', cartDetails);

    const products = await prisma.product.findMany({
      where: { id: { in: cartDetails.map(item => item.productId) } },
    });
    console.log({ products });

    const totalAmount = cartDetails.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId);
      return acc + (product.price * item.quantity);
    }, 0);

    const taxAmount = 0;
    const productServiceCharge = 0;
    const productDeliveryCharge = 0;

    const order = await prisma.order.create({
      data: {
        addressInfo: {
          create: { address, state, city, country, pinCode, PhoneNo },
        },
        OrderItem: {
          create: cartDetails.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    if (!order) {
      console.log('Order creation failed');
      return { error: "Order not created" };
    }

    const transactionUUID = order.id;

    const signature = createSignature({
      total_amount: totalAmount,
      transaction_uuid: transactionUUID,
      product_code: "EPAYTEST",
    });

    const esewaPayload = {
      amount: totalAmount, 
      tax_amount: taxAmount,
      transaction_uuid: transactionUUID,
      product_code: "EPAYTEST", 
      signature: signature,
      product_service_charge: productServiceCharge,
      product_delivery_charge: productDeliveryCharge,
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${order.id}`,
      failure_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    esewaPayload.signature = signature;

    if (paymentMethod === "stripe") {
      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartDetails.map((item) => {
          const product = products.find(p => p.id === item.productId);
          return {
            price_data: {
              currency: "npr",
              product_data: { name: product.name },
              unit_amount: product.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
      });

      return { result: stripeSession.url };
    } else if (paymentMethod === "esewa") {
      return { result: "https://rc-epay.esewa.com.np/api/epay/main/v2/form", esewaPayload };
    } else {
      return { error: "Invalid payment method" };
    }
  } catch (error) {
    console.error('Error during order creation:', error);
    return { error: "Order not created" };
  }
};

const createSignature = (payload) => {
  const secret = "8gBm/:&EnhH.1/q"; 

  const message = `total_amount=${payload.total_amount},transaction_uuid=${payload.transaction_uuid},product_code=${payload.product_code}`;

  const hash = CryptoJS.HmacSHA256(message, secret);

  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  console.log("Generated eSewa Signature:", hashInBase64);

  return hashInBase64;
};



export const confirmOrder = async (id) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  let order;
  try {
    order = await prisma.order.update({
      where: { id },
      data: { isPaid: true },
    });
    if (!order) {
      return { error: "Order not updated" };
    }
  } catch (error) {
    return { error: "Order not updated" };
  }
  return { result: order };
};
