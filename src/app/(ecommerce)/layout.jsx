import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import prisma from "@/utils/connection";
import React from "react";

const EcommerceLayout = async({ children }) => {
  const categories = await prisma?.category.findMany();
  return (
    <div>
      <Toaster />
      <Header categories={categories} />
      {children}
    </div>
    
  );
};

export default EcommerceLayout;
