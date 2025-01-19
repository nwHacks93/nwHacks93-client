"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import GetName from "./steps/GetName";
import PreferredGroupSize from "./steps/PreferredGroupSize";
import WillingToCommute from "./steps/WillingToCommute";
import YourInterest from "./steps/YourInterest";
import { signOut } from "firebase/auth";
import { logout } from "@/lib/firestore/auth";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [profile, setProfile] = useState<Map<string, any>>(new Map());
  const [step, setStep] = useState<number>(0);

  type StepComponents = {
    [key: number]: JSX.Element;
  };

  useEffect(() => {
    const stepParam = searchParams.get("step");

    if (!stepParam) {
      router.replace("?step=1");
      setStep(1);
    } else {
      const parsedStep = parseInt(stepParam, 10);
      setStep(parsedStep);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const checkSignedIn = async () => {
      const userProfile = localStorage.getItem("userEmail");
      try {
        await fetch(`/api/profile/${userProfile}`);
        router.push("/app");
      } catch (error) {
        // router.push("/");
        // logout();
      }
    };

    checkSignedIn();
  }, []);

  const stepComponents: StepComponents = {
    0: <GetName profile={profile} setProfile={setProfile} />,
    1: <YourInterest profile={profile} setProfile={setProfile} />,
    2: <PreferredGroupSize profile={profile} setProfile={setProfile} />,
    3: <WillingToCommute profile={profile} setProfile={setProfile} />
  };

  return <>{stepComponents[step]}</>;
}
