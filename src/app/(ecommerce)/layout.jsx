import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
import React from "react";

const EcommerceLayout = async({ children }) => {
  const categories = await prisma?.category.findMany();
  const session = await getSession();

  const plainSession = {
    isLoggedIn: session?.isLoggedIn,
    user: {
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
    },
  };

  const plainCategories = categories?.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    image: category.image,
  }));

  return (
    <div>
      <Toaster />
      <Header categories={plainCategories} session={plainSession} />
      {children}
    </div>
  );
};

export default EcommerceLayout;
