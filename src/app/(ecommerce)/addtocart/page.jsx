"use client";
import AddAddress from "@/components/AddAddress";
import { setCart } from "@/redux/slice/cartSlice";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Minus } from "lucide-react"; // Import Lucide icons

const CartPage = () => {
  const { cart = [] } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    const updateCart = cart.filter((item) => item.product.id !== id);
    dispatch(setCart(updateCart));
  };

  const updateQuantity = (id, qty) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const handleIncrement = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 shadow-md my-8 ">
        <div className="w-full bg-white p-10">
          <div className="flex justify-between border-b pb-8 font-semibold text-2xl">
            <h1>Shopping Cart</h1>
            <h2>{cart ? cart.length : 0} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-center text-xs w-2/4">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-xs md:uppercase w-2/4">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-xs md:uppercase w-2/4">
              Price
            </h3>
            <h3 className="font-semibold text-center text-xs md:uppercase w-2/4">
              Total
            </h3>
          </div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-gray-100 px-6 py-5"
            >
              <div className="flex">
                <div className="w-18 md:w-24">
                  <Image
                    src={item?.product?.images?.[0]}
                    alt="cart"
                    width={120}
                    height={120}
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">
                    {item?.product?.name}
                  </span>
                  <span className="text-red-500 text-xs">Apple</span>
                  <span
                    onClick={() => removeItem(item.product.id)}
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                  >
                    Remove
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() =>
                    handleDecrement(item.product.id, item.quantity)
                  }
                  className="text-xl text-gray-500 hover:text-black"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  className="mx-2 border text-center w-6 md:w-12"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(
                      item.product.id,
                      parseInt(event.target.value)
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleIncrement(item.product.id, item.quantity)
                  }
                  className="text-xl text-gray-500 hover:text-black"
                >
                  <Plus size={16} />
                </button>
              </div>

              <span className="text-center w-1/4 font-semibold">
                Rs {item.product.price}
              </span>
              <span className="text-center w-1/4 font-semibold">
                Rs {item.product.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className="p-10">
          <h1 className="font-semibold text-2xl border-b">Order Summary</h1>
          <div className="flex justify-between mb-4 mt-8">
            <span className="font-semibold text-sm uppercase">
              Items {cart?.length}
            </span>
            <span className="font-semibold text-sm">Rs {totalPrice()}</span>
          </div>
          <div>
            <span className="font-medium inline-block mb-3 uppercase text-sm">
              Shipping
            </span>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option value="Standard shipping - Rs 50">
                Standard shipping - Rs 50
              </option>
            </select>
          </div>
          <div className="font-semibold flex justify-between py-6 text-sm uppercase">
            <span>Total Cost</span>
            <span>Rs {totalPrice() + 50}</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 text-sm text-white py-2 rounded-md transition-all uppercase w-full">
            <AddAddress />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
