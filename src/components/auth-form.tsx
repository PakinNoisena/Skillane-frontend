"use client";

import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "signin" | "signup" | "recover" | "resetPassword";
  submitBtnAction: (email: string, password: string) => void;
  googleSignIn?: () => void;
}

const AuthForm = (props: AuthFormProps) => {
  const router = useRouter();

  const [headerText, setHeaderText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectToRecover = (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault();
    router.push("/recover");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submitBtnAction(email, password);
  };

  const handleGoogleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (props.googleSignIn) {
      props.googleSignIn();
    }
  };

  const { type } = props;

  useEffect(() => {
    let header = "";
    let btn = "";
    switch (props.type) {
      case "signin":
        header = "Login to Your Account";
        btn = "Sign In";
        break;
      case "signup":
        header = "Register New Account";
        break;
      case "recover":
        header = "Forgot Account";
        break;
      case "resetPassword":
        header = "Reset New Password";
        break;
    }
    setHeaderText(header);
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="md:text-6xl text-lg font-bold mb-4 text-gray-600">
        {headerText}
      </h2>

      {type === "signin" && (
        <>
          <div className="flex justify-center mb-5r">
            <span className="cursor-pointe" onClick={handleGoogleClick}>
              <SocialIcon network="google" />
            </span>
          </div>

          <div className="flex items-center justify-center my-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="px-3 font-bold text-gray-400">OR</p>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </>
      )}

      <form className="w-full" onSubmit={handleSubmit}>
        {/* Email Input */}
        {(type === "signin" ||
          type === "signup" ||
          type === "recover" ||
          type === "resetPassword") && (
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full border-[2px] border-dark-green rounded-3xl focus:ring-2 focus:ring-dark-green focus:outline-none py-3 px-8"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        )}

        {/* Password Input */}
        {(type === "signin" ||
          type === "signup" ||
          type === "resetPassword") && (
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full border-[2px] border-dark-green rounded-3xl focus:ring-2 focus:ring-dark-green focus:outline-none py-3 px-8"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {type === "signin" && (
          <div className="text-right mb-4 ">
            <p
              className="text-dark-green cursor-pointer hover:text-green-900"
              onClick={redirectToRecover}
            >
              Forgot password?
            </p>
          </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-dark-green text-white py-3 rounded-3xl font-medium hover:bg-green-700 transition duration-200"
        >
          {type}
        </button>
      </form>

      {/* Signup Button mobile */}
      {type === "signin" && (
        <div>
          <p className="block md:hidden text-sm mt-3 text-gray-400">
            Need an account?
            <Link href="http://localhost:3000/register" className="underline">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      )}
      {type === "signup" && (
        <div>
          <p className="block md:hidden text-sm mt-3 text-gray-400">
            Back to?
            <Link href="http://localhost:3000/signin" className="underline">
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
