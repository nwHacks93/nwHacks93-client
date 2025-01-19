"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUserDetails, signInWithGoogle } from "@/lib/firestore/auth";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleOAuthLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/app");
    } catch (error) {
      console.error("Error during OAuth login: ", error);
    }
  };

  useEffect(() => {
    const checkSignedIn = async () => {
      const userDetails = await getUserDetails();
      if (userDetails && userDetails.email) {
        router.push("/app/signup");
      }
    };

    checkSignedIn();
  }, []);

  return (
    <div className='relative w-full h-screen overflow-hidden bg-[#638C6D]'>
      <div className='relative flex flex-col items-center justify-center w-full h-full z-10'>
        <Image src='/butter.svg' alt='butter' width={200} height={200} className='mb-10' />

        <h1 className='text-3xl md:text-4xl text-[white] font-bold mb-2 text-center'>Welcome to Butter!</h1>
        <p className='text-lg md:text-xl text-[white] text-center mb-8 w-3/4 md:w-1/2'>Where we smoothen your social experience!</p>

        <button
          onClick={handleOAuthLogin}
          className='border-2 border-[#D2A278] bg-[#FFF6B3] text-black font-semibold py-3 px-6 rounded-lg text-xl'
        >
          Get Started!
        </button>
      </div>
    </div>
  );
}
