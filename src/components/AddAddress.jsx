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
  const [loading, setLoading] = useState(false);

  const submit = async (formData) => {
    // Add payment_method to form data
    formData.set("payment_method", paymentMethod);

    setLoading(true);
    const response = await createOrder(formData, cart);
    setLoading(false);

    if (response.error) {
      toast({ variant: "destructive", title: response.error });
    } else {
      if (paymentMethod === "khalti") {
        // Redirect directly to Khalti payment URL
        window.location.href = response.result;  // Use the Khalti URL to redirect
      } else {
        // Redirect to Stripe or other payment provider's page
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
                submit(new FormData(e.target));  // Collect form data
              }}
            >
              <FormInput
                id="address"
                name="address"  // Ensure name attribute is added
                label="Address"
                placeholder="Enter address"
                type="text"
                className="h-10"
              />
              <FormInput
                id="state"
                name="state"  // Ensure name attribute is added
                label="State"
                placeholder="Enter state"
                type="text"
                className="h-10"
              />
              <FormInput
                id="city"
                name="city"  // Ensure name attribute is added
                label="City"
                placeholder="Enter the city"
                type="text"
                className="h-10"
              />
              <FormInput
                id="country"
                name="country"  // Ensure name attribute is added
                label="Country"
                placeholder="Enter country"
                type="text"
                className="h-10"
              />
              <FormInput
                id="pinCode"
                name="pinCode"  // Ensure name attribute is added
                label="Pin code"
                placeholder="Enter the pin code"
                type="number"
                className="h-10"
              />
              <FormInput
                id="phoneNo"
                name="phoneNo"  // Ensure name attribute is added
                label="Phone number"
                placeholder="Enter Phone number"
                type="number"
                className="h-10"
              />

              {/* Payment Method Selection */}
              <div className="mt-4">
                <label htmlFor="stripe" className="mr-4">Payment Method:</label>
                <input
                  type="radio"
                  id="stripe"
                  name="payment_method"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />{" "}
                <label htmlFor="stripe">Stripe</label>
                <input
                  type="radio"
                  className="ml-2"
                  id="khalti"
                  name="payment_method"
                  value="khalti"
                  checked={paymentMethod === "khalti"}
                  onChange={() => setPaymentMethod("khalti")}
                />{" "}
                <label htmlFor="khalti">Khalti</label>
              </div>

              {/* Submit Button */}
              <FormSubmit
                type="submit"  // Make sure it's a submit button
                className="w-full bg-red-500 text-white h-10 mt-4 hover:bg-red-600 transition-all"
                disabled={loading}  // Disable the button when loading
              >
                {loading ? "Processing..." : "Create Order"}
              </FormSubmit>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddAddress;
