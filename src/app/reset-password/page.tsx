"use client";

import React from "react";
import Image from "next/image";
import AuthForm from "@/components/auth-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthManagementStore } from "@/stores/auth.store";

const Register = () => {
  const { resetPass } = useAuthManagementStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onReset = (email: string, password: string) => {
    if (!token) {
      alert("Invalid or missing token.");
      return;
    }
    resetPass(email, password, token);
    router.push("/signin");
  };

  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-0">
      {/* Left Column - Centered Content */}
      <div className="w-full h-[100vh] relative flex flex-col items-center justify-center">
        {/* Logo at Top-Left */}
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 flex items-center">
          <Image
            src="/images/skillane-logo.png"
            alt="skillane logo"
            width={80}
            height={80}
            className="object-cover rounded-full border-dark-green border-[2px] p-1"
          />
          <span className="text-dark-green ps-2 font-mono font-extrabold text-lg">
            Skillane
          </span>
        </div>

        {/* Centered Auth Form */}
        <div className="w-full flex justify-center p-20">
          <AuthForm type="resetPassword" submitBtnAction={onReset} />
        </div>
      </div>

      {/* Right Column (Hidden on Mobile) */}
      <div className="w-full h-[100vh] bg-dark-green md:flex hidden items-center justify-center">
        <div className="text-center flex flex-col">
          <p className="text-white text-5xl font-bold font-serif mx-5">
            Provide email and New Password to reset
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
