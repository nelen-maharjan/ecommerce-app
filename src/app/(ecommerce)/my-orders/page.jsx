import OrderList from "@/components/OrderList"; // Assuming you have this component
import prisma from "@/utils/connection";
import { getSession } from "@/utils/actions"; // Assuming you have this utility

const MyOrders = async () => {
  // Fetch the current session (logged-in user)
  const session = await getSession();

  if (!session?.isLoggedIn) {
    return <div>Please log in to view your orders.</div>;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,  
      isPaid: true, 
    },
    include: {
      OrderItem: {
        include: {
          product: true,  
        },
      },
      addressInfo: true, 
    },
  });

  // Display the orders using OrderList component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <OrderList orders={orders} /> 
      )}
    </div>
  );
};

export default MyOrders;
