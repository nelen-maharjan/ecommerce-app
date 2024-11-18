import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer>
      <div className="my-12 grid grid-cols-2 md:grid-cols-4 items-center gap-12">
      <div className="">
        <div>
          <Image src={"/logo.png"} width={150} height={150} alt="logo" />
        </div>
        <p className="text-gray-900 text-sm mt-4">
          123 Panga, Kirtipur, Nepal
        </p>
        <p className="text-gray-900 text-sm">+977-123456789</p>
        <p className="text-gray-900 text-sm">mail@example.com</p>
        <div>
          <div className="flex mt-3 gap-2">
            <RiFacebookCircleFill size={22} />
            <RiInstagramFill size={22} />
            <RiTwitterFill size={22} />
            <RiLinkedinBoxFill size={22} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">Customer Service</h2>
        <ul>
          <li>Help Center</li>
          <li>How to Buy</li>
          <li>Track Your Order</li>
          <li>Corporate & Bulk Purchasing</li>
          <li>Returns & Refunds</li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">Categories</h2>
        <ul>
          <li>
            <Link href="/products">Electronics</Link>{" "}
          </li>
          <li>
            <Link href="/products">Men's Clothing</Link>{" "}
          </li>
          <li>
            <Link href="/products">Mobile Phones</Link>{" "}
          </li>
          <li>
            <Link href="/products">Women's Clothing</Link>{" "}
          </li>
          <li>
            <Link href="/products">Watches</Link>{" "}
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">Our Company</h2>
        <ul>
          <li>About Us</li>
          <li>Privacy & Cookies Policy</li>
          <li>Terms & Conditions</li>
          <li>Promo & Terms</li>
        </ul>
      </div>
    </div>
    <Separator />
    <div className="text-center my-4">
      <p>Copyright &copy; 2024 Ecommerce | Nelen Maharjan</p>
    </div>
    </footer>
  );
};

export default Footer;
