import OrderList from "@/components/OrderList";
import prisma from "@/utils/connection";
import React from "react";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany();
  // console.log(users, 'users');
  return (
    <>
      <OrderList orders={orders} />
    </>
  );
};

export default OrdersPage;
