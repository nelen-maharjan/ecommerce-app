import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const EcommerceLayout = ({ children }) => {
  return (
    <div>
      <Toaster />
      <Header />
      {children}
    </div>
  );
};

export default EcommerceLayout;
