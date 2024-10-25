"use client";
import { toast } from "@/hooks/use-toast";
import { setCart } from "@/redux/slice/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = ({ children, item }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.auth);

  const submit = () => {
    if (!item || !item.id) {
      toast({variant:'destructive' , title: "Invalid product" });
      return;
    }

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.product.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      dispatch(setCart(updatedCart));
      toast({ title: "Item quantity updated" });
    } else {
      dispatch(setCart([...cart, { product: item, quantity: 1 }]));
      toast({ title: "Added to cart successfully" });
    }
  };

  return (
    <div className="w-full" onClick={submit}>
      {children}
    </div>
  );
};

export default AddToCart;

