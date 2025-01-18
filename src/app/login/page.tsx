"use client";
import React from "react";
import { signInWithGoogle } from "@/lib/db/auth";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleOAuthLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/app");
    } catch (error) {
      console.error("Error during OAuth login: ", error);
    }
  };

  return (
    <div className='bg-pastel-blue flex items-center justify-center min-h-screen'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-sm w-full'>
        <h1 className='text-3xl font-semibold text-center text-pastel-purple mb-4'>Welcome Back!</h1>
        <p className='text-center text-gray-600 mb-6'>Please sign in to continue</p>
        <button
          onClick={handleOAuthLogin}
          className='w-full bg-pastel-green text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200'
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
