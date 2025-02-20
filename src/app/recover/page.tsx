"use client";

import React, { useState } from "react";
import Image from "next/image";
import AuthForm from "@/components/auth-form";
import { useAuthManagementStore } from "@/stores/auth.store";

const Recover = () => {
  const { recover } = useAuthManagementStore();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onRecover = (email: string) => {
    recover(email);
    setSubmitSuccess(true);
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
          <AuthForm type="recover" submitBtnAction={onRecover} />
        </div>

        {submitSuccess && (
          <p className="text-green-600">Please check your email</p>
        )}
      </div>

      {/* Right Column (Hidden on Mobile) */}
      <div className="w-full h-[100vh] bg-dark-green md:flex hidden items-center justify-center">
        <div className="text-center flex flex-col">
          <p className="text-white text-5xl font-bold font-serif">
            Enter Email to recover password
          </p>

          <p className="text-white mt-10 font-bold font-serif">
            Recovery Link will be send to your Email after you have recover
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recover;
