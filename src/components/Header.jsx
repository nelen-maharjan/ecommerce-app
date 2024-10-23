'use client'

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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { components } from "@/utils/data";
import { Input } from "./ui/input";
import { Heart, Menu, ShoppingCart } from "lucide-react";

const Header = ({categories}) => {
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
                      {categories.map((component) => (
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
            <Link href='/wishlist'>
                <Heart size={20} />
            </Link>
            <Link href='/addtocart'>
                <ShoppingCart size={20} />
            </Link>
            <div>
                <Menu size={20} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const ListItem = forwardRef(({ className,image, title, children, ...props }, ref) => {
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
            <img src={image} alt="cat.image" className="h-8 w-8" />
            <h2>{title}</h2>
            </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
