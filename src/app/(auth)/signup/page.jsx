"use client";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { toast } from "@/hooks/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import { register } from "@/utils/actions";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [image, setImage] = useState("");
  const onSubmit = async (formData) => {
    const res = await register(formData,image);
    if(res?.error){
        toast({title:res.error})
    }else{
        toast({title: res.message})
    }
    
  };
  console.log(image, "image");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen bg-[#cbe3e9]">
        <img src="./signup.png" alt="signup" />
      </div>
      <div className="p-[15%] bg-white">
        <h1 className="text-2xl font-medium">Create an account</h1>
        <form action={onSubmit}>
          <FormInput
            id="name"
            label="Full Name"
            placeholder="Enter your name"
            type="text"
            className="h-18"
          />
          <FormInput
            id="email"
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            className="h-18"
          />
          <FormInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="h-18"
          />
          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button:
                "ut-uploading:cursor-not-allowed bg-slate-600 mt-2 w-full text-xl after:bg-orange-400 max-w-[700px]",
              allowedContent: "hidden",
            }}
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
            }}
            onUploadError={(error) => {
              alert(`ERROR ${error.message}`);
            }}
          />
          <FormSubmit className='w-full mt-10 bg-red-500 text-lg text-white h-12 hpver:bg-red-400 transition-all '>
            Create
          </FormSubmit>
          <div className="mt-2 text-center">
          Already have account? <Link href={'/login'} className="text-blue-600 underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
