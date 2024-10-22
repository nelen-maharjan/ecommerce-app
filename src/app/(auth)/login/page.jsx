"use client";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { toast } from "@/hooks/use-toast";
import { login } from "@/utils/actions";
import Link from "next/link";
import React from "react";

const Login = () => {
  const onSubmit = async (formData) => {
    const res = await login(formData);
    if(res?.error){
        toast({title:res.error})
    }else{
        toast({title: res.message})
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen bg-[#cbe3e9]">
        <img src="./signup.png" alt="signup" />
      </div>
      <div className="p-[15%] bg-white">
        <h1 className="text-2xl font-medium">Login to your account</h1>
        <form action={onSubmit}>
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
          <FormSubmit className='w-full mt-10 bg-red-500 text-lg text-white h-12 hpver:bg-red-400 transition-all '>
            Login
          </FormSubmit>
          <div className="mt-2 text-center">
          Dont have an account yet? <Link href={'/signup'} className="text-blue-600 underline"> Sign up</Link> now
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
