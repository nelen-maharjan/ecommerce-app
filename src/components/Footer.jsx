import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <div className="my-6 grid grid-cols-4 gap-8">
      <div className="">
        <div>
          <Image src={"/logo.png"} width={150} height={150} alt="logo" />
        </div>
        <p className="text-gray-600 font-medium text-sm">
          123 Panga, Kirtipur, Nepal
        </p>
        <p className="text-gray-600 font-medium text-sm">+977-123456789</p>
        <p className="text-gray-600 font-medium text-sm">mail@example.com</p>
        <div>
          <div className="flex mt-3 gap-2">
            <RiFacebookCircleFill size={25} />
            <RiInstagramFill size={25} />
            <RiTwitterFill size={25} />
            <RiLinkedinBoxFill size={25} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-lg">Customer Service</h2>
        <ul>
          <li>Help Center</li>
          <li>How to Buy</li>
          <li>Track Your Order</li>
          <li>Corporate & Bulk Purchasing</li>
          <li>Returns & Refunds</li>
        </ul>
      </div>
      <div className="">
        <h2>Categories</h2>
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
      <div className="">
        <h2>Our Company</h2>
        <ul>
          <li>About Us</li>
          <li>Privacy & Cookies Policy</li>
          <li>Terms & Conditions</li>
          <li>Promo & Terms</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
