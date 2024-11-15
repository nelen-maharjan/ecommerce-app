"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/orders";
import { toast } from "@/hooks/use-toast";

const AddAddress = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setLoading(true);

    const formData = new FormData(e.target); // Collect form data

    try {
      console.log(formData, "cart");
      const response = await createOrder(formData, cart);

      if (response.error) {
        toast({ variant: "destructive", title: response.error });
      } else {
        // Redirect to Khalti payment URL
        window.location.href = response.result; // Khalti payment URL
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>Checkout</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Address</SheetTitle>
          <SheetDescription>
            <form onSubmit={submit}>
              <FormInput
                id="address"
                label="Address"
                placeholder="Enter address"
                type="text"
                className="h-10"
              />
              <FormInput
                id="state"
                label="State"
                placeholder="Enter state"
                type="text"
                className="h-10"
              />
              <FormInput
                id="city"
                label="City"
                placeholder="Enter the city"
                type="text"
                className="h-10"
              />
              <FormInput
                id="country"
                label="Country"
                placeholder="Enter country"
                type="text"
                className="h-10"
              />
              <FormInput
                id="pinCode"
                label="Pin code"
                placeholder="Enter the pin code"
                type="number"
                className="h-10"
              />
              <FormInput
                id="phoneNo"
                label="Phone number"
                placeholder="Enter Phone number"
                type="number"
                className="h-10"
              />
              <FormSubmit
                className="w-full bg-red-500 text-white h-10 mt-4 hover:bg-red-600 transition-all"
                disabled={loading}
              >
                {loading ? "Creating order..." : "Create"}
              </FormSubmit>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddAddress;
