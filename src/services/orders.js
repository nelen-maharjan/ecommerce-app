"use server";

import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (formData, cart) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  const userId = session.user.id; // Get the userId from session
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
    // Prepare cart details for order creation
    const cartDetails = cart?.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      };
    });

    // Create the order in the database, associating it with the user
    const order = await prisma.order.create({
      data: {
        userId: userId, // Link the order to the user
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

    // Calculate total amount and convert to Paisa (1 NPR = 100 Paisa)
    const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const amountInPaisa = totalAmount * 100;

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
        total_price: item.product.price * 100,  // In Paisa
        quantity: item.quantity,
        unit_price: item.product.price * 100,   // In Paisa
      })),
    };

    // If payment method is Khalti, initiate Khalti payment
    if (paymentMethod === "khalti") {
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

      if (response.data && response.data.payment_url) {
        return { result: response.data.payment_url };  // Return Khalti payment URL
      } else {
        return { error: "Khalti payment initiation failed" };
      }
    }

    // If payment method is Stripe, initiate Stripe checkout session
    else if (paymentMethod === "stripe") {
      // Create Stripe Checkout Session
      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartDetails.map((item) => {
          const product = cart.find((p) => p.product.id === item.productId); 
          return {
            price_data: {
              currency: "npr", // Ensure this matches your Stripe account currency
              product_data: { name: product.product.name },
              unit_amount: product.product.price * 100, // In cents (NPR to Paisa)
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
      });

      return { result: stripeSession.url }; 
    }

    else {
      return { error: "Invalid payment method" };
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Order not created" };
  }
};


export const confirmOrder = async (id) => {
  const session = await getSession();
  
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  try {
    // First, find the order by ID
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return { error: "Order not found" };
    }

    // Ensure the logged-in user is the same as the one who created the order
    if (order.userId !== session.user.id) {
      return { error: "You are not authorized to update this order" };
    }

    // Now, update the order to mark it as paid
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { isPaid: true },
    });

    if (!updatedOrder) {
      return { error: "Order not updated" };
    }

    return { result: updatedOrder };
  } catch (error) {
    console.error("Error confirming order:", error);
    return { error: "Order not updated" };
  }
};

