"use client";

import React from "react";
import Image from "next/image";
import AuthForm from "@/components/auth-form";
import { useAuthManagementStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

const Signin = () => {
  const { accessToken, logIn, logOut } = useAuthManagementStore();
  const router = useRouter();

  const onSignIn = (email: string, password: string) => {
    logIn(email, password);
  };

  const googleSignIn = () => {
    router.replace("http://localhost:8080/skillane/auth/google");
  };

  const backToRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/register");
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
          <AuthForm
            type="signin"
            submitBtnAction={onSignIn}
            googleSignIn={googleSignIn}
          />
        </div>
      </div>

      {/* Right Column (Hidden on Mobile) */}
      <div className="w-full h-[100vh] bg-dark-green md:flex hidden items-center justify-center">
        <div className="text-center flex flex-col">
          <p className="text-white text-5xl font-bold font-serif">New Here?</p>
          <p className="text-white text-xl font-serif mt-10">
            Sign up to discover more about us!
          </p>
          <button
            onClick={backToRegister}
            type="submit"
            className="w-full bg-white text-dark-green py-3 rounded-3xl mt-10"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
