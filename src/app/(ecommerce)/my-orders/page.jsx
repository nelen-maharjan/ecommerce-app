import OrderList from "@/components/OrderList"; // Assuming you have this component
import prisma from "@/utils/connection";
import { getSession } from "@/utils/actions"; // Assuming you have this utility

const MyOrders = async () => {
  // Fetch the current session (logged-in user)
  const session = await getSession();

  if (!session?.isLoggedIn) {
    return <div>Please log in to view your orders.</div>;
  }

  // Fetch the orders placed by the logged-in user (through OrderItem and Product)
  const orders = await prisma.order.findMany({
    where: {
      OrderItem: {
        some: {
          product: {
            userId: session.user.id, // Filter OrderItems by the user's ID in the Product model
          },
        },
      },
      isPaid: true, // Optionally filter paid orders
    },
    include: {
      OrderItem: {
        include: {
          product: true, // Include product data for each order item
        },
      },
      addressInfo: true, // Include address information if necessary
    },
  });

  // Display the orders using OrderList component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <OrderList orders={orders} />  // Pass orders to OrderList component
      )}
    </div>
  );
};

export default MyOrders;
