"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { createOrder } from "@/services/orders";
import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AddAddress = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const submit = async (formData) => {
    // Add payment_method to form data
    formData.set("payment_method", paymentMethod);

    const response = await createOrder(formData, cart);
    if (response.error) {
      toast({ variant: "destructive", title: response.error });
    } else {
      if (paymentMethod === "esewa") {
        // Create a form dynamically to submit to eSewa
        const form = document.createElement("form");
        form.action = response.result; // eSewa API URL
        form.method = "POST";

        for (let key in response.esewaPayload) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = response.esewaPayload[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
      } else {
        // If payment method is Stripe, just redirect
        router.push(response.result);
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger>Checkout</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Address</SheetTitle>
          <SheetDescription>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(new FormData(e.target));
              }}
            >
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

              {/* Payment Method Selection */}
              <div className="mt-4">
                <label className="mr-4">Payment Method:</label>
                <input
                  type="radio"
                  id="stripe"
                  name="payment_method"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />{" "}
                Stripe
                <input
                  type="radio"
                  id="esewa"
                  name="payment_method"
                  value="esewa"
                  checked={paymentMethod === "esewa"}
                  onChange={() => setPaymentMethod("esewa")}
                />{" "}
                eSewa
              </div>

              <FormSubmit className="w-full bg-red-500 text-white h-10 mt-4 hover:bg-red-600 transition-all">
                Create
              </FormSubmit>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddAddress;
