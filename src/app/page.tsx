"use client"
import ladingCircle from "@/assets/icons/ladingCircle.svg";
import butter from "/butter.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiX } from "react-icons/pi";

export default function Home() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/login");
  }
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[white]">
      {/* <Image
        src={ladingCircle}
        alt="ladingCircle"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      /> */}

      <div className="relative flex flex-col items-center justify-center w-full h-full z-10">
        <Image
          src="/butter.svg"
          alt="butter"
          width={200}
          height={200}
          className="mb-10" 
        />

        <h1 className="text-3xl md:text-4xl text-[#A7774C] font-bold mb-2 text-center">
          Welcome to Butter!
        </h1>
        <p className="text-lg md:text-xl text-[#A7774C] text-center mb-8 w-3/4 md:w-1/2">
          Where we smoothen your social experience!
        </p>

        <button
          onClick={handleGetStarted}
          className="border-2 border-[#D2A278] bg-[#FFF6B3] text-black font-semibold py-3 px-6 rounded-lg text-xl"
        >
          Get Started!
        </button>
      </div>
    </div>
  );
}
