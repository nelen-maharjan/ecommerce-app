import { toast } from "@/hooks/use-toast";
import { emailVerify } from "@/utils/actions";
import React from "react";

const Verification = async ({ params }) => {
  console.log(params?.verificationid);
  const res = await emailVerify(params?.verificationid);
//   if (res?.error) {
//     toast({ title: res.error });
//   }

  return (
    <div className="text-white grid place-content-center h-screen">
      {res?.error || "loading..."}
    </div>
  );
};

export default Verification;
