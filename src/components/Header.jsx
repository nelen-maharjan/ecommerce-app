"use client";
import React, { forwardRef } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "./ui/input";
import { Heart, LayoutDashboard, ListOrdered, Menu, ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import { logout } from "@/utils/actions";

const Header = ({ categories, session }) => {
  console.log("After login",session);
  const plainSession = {
    isLoggedIn: session?.isLoggedIn,
    user: {
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
      role: session?.user?.role,  
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
      <Navbar />
      <div className="flex justify-between items-center h-20 px-[10%]">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            className="cursor-pointer"
            width={150}
            height={150}
            alt="logo"
          />
        </Link>
        <div className="text-md flex items-center">
          <Link href={"/"} className="hidden sm:block">
            Home
          </Link>
          <div className="hidden sm:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Category</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {plainCategories?.map((component) => (
                        <ListItem
                          key={component.id}
                          title={component.name}
                          href={`/products?cat=${component.id}`}
                          image={component.image}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input className="h-8 hidden sm:block" placeholder="Search" />
          <Link href="/wishlist">
            <Heart size={20} />
          </Link>
          <Link href="/addtocart">
            <ShoppingCart size={20} />
          </Link>

          {!plainSession?.isLoggedIn && (
            <Link href="/login" className="text-slate-800 hover:underline">
              Login
            </Link>
          )}

          {plainSession?.isLoggedIn ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={plainSession?.user?.image}
                    alt={plainSession?.user?.name}
                  />
                  <AvatarFallback>
                    {plainSession?.user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-2">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      {plainSession?.user?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {plainSession?.user?.email}
                    </p>
                  </div>
                  <Separator className="my-1" />
                  {plainSession?.user?.role === "admin" && (
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard size={20} /> <span>Dashboard</span>
                    </Link>
                  )}
                  <Separator className="my-1" />
                  <Link href="/my-orders" className="flex items-center gap-2">
                    <ListOrdered size={20} /> <span>My Orders</span>
                  </Link>
                  <Separator className="my-1" />
                  <form action={logout}>
                    <button className="cursor-pointer border-none outline-none flex items-center gap-2">
                      Logout
                    </button>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          ) : null}

          <div>
            <Menu size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const ListItem = forwardRef(
  ({ className, image, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex items-center gap-4">
              <Image src={image} alt="cat.image" width={50} height={50} />
              <h2>{title}</h2>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
