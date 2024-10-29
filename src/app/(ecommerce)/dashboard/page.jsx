// "use client";
import CurvedLineGraph from "@/components/CurvedLineGraph";
import PieChart from "@/components/PieChart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/utils/connection";
import Link from "next/link";
import React from "react";

const Dashboard = async () => {
  const [users, userCount, orders] = await prisma?.$transaction([
    prisma.user.findMany(),
    prisma.user.count(),
    prisma.order.findMany({
      include: { OrderItem: { include: { product: true } } },
    }),
  ]);

  //total price
  const totalPriceByProduct = orders?.reduce((acc, order) => {
    order.OrderItem?.forEach(({ product, quantity }) => {
      const totalPrice = product.price * quantity;
      if (acc[product.id]) {
        acc[product.id].totalPrice += totalPrice;
      } else {
        acc[product.id] = {
          productName: product?.name,
          totalPrice,
        };
      }
    });
    return acc;
  }, {});

  const overallTotalPrice = Object.values(totalPriceByProduct)?.reduce(
    (total, product) => {
      return total + product.totalPrice;
    },
    0
  );

  //revenue
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`?.slice(-2);
    return `${year}=${month}`;
  };
  let dataForGraph;
  if (orders?.length) {
    const monthlyRevenue = orders?.reduce((acc, order) => {
      const month = formatDate(order.createdAt);

      const orderTotal = order.OrderItem?.reduce(
        (sum, item) => item?.product?.price * item.quantity,
        0
      );

      if (!acc[month]) acc[month] = 0;
      acc[month] += orderTotal;
      return acc;
    });
    dataForGraph = Object?.entries(monthlyRevenue).map(([month, revenue]) => ({
      x: month,
      y: revenue,
    }));
  }

  const usersByMonth = users?.reduce((acc, user) => {
    const month = user.createdAt.getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full p-8 bg-white">
      <div className="grid grid-cols-3 gap-6 w-full">
        <Card className="col-span-1 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>{userCount} | Total visited users</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/users">
              <Button className="text-blue-700 border-blue-600 bg-slate-300 hover:text-white">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="col-span-1 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>{orders?.length} | Total orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/orders">
              <Button className="text-blue-700 border-blue-600 bg-slate-300 hover:text-white">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="col-span-1 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <CardDescription>Rs-{0} | Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/users">
              <Button className="text-blue-700 border-blue-600 bg-slate-300 hover:text-white">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <Card className="col-span-2 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <CardDescription>
              <span className="text-green-500">Current week Rs 10000 7%</span>
              <br />
              <span className="text-red-600">Previos week Rs 16700 5%</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <CurvedLineGraph 
            dataForGraph={dataForGraph}
            className="w-full h-[300px]" 
            /> */}
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              usersByMonth={usersByMonth}
              className="w-full h-[300px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
