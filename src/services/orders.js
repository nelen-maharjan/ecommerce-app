"use server";

import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
const axios = require("axios");

export const createOrder = async (formData, cart) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  const address = formData.get("address");
  const state = formData.get("state");
  const city = formData.get("city");
  const country = formData.get("country");
  const pinCode = parseInt(formData.get("pinCode"));
  const PhoneNo = parseInt(formData.get("phoneNo"));

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

    // Create Order in Database
    const order = await prisma.order.create({
      data: {
        addressInfo: {
          create: { address, state, city, country, pinCode, PhoneNo },
        },
        OrderItem: {
          create: cartDetails,
        },
      },
    });

    if (!order) {
      return { error: "Order not created" };
    }

    const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const amountInPaisa = totalAmount * 100; // Convert to Paisa (1 NPR = 100 Paisa)

    // Prepare Khalti Payment Request
    const paymentPayload = {
      return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${order.id}`,
      website_url: process.env.NEXT_PUBLIC_FRONTEND_URL,
      amount: amountInPaisa,
      purchase_order_id: order.id.toString(),
      purchase_order_name: "Order Payment",
      customer_info: {
        name: session.user?.name,
        email: session.user?.email,
        phone: PhoneNo,
      },
      amount_breakdown: [
        {
          label: "Total",
          amount: amountInPaisa,
        },
      ],
      product_details: cart.map((item) => ({
        identity: item.product.id.toString(),
        name: item.product.name,
        total_price: item.product.price * 100,
        quantity: item.quantity,
        unit_price: item.product.price * 100,
      })),
    };

    console.log("Payment Payload:", paymentPayload);

    // Call Khalti API to initiate payment
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      paymentPayload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Khalti Response:", response.data);

    if (response.data && response.data.payment_url) {
      return { result: response.data.payment_url }; // Return the payment URL for redirection
    } else {
      return { error: "Payment initiation failed" };
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Order not created" };
  }
};

