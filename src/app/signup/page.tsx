"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import GetName from "./steps/GetName";
import PreferredGroupSize from "./steps/PreferredGroupSize";
import WillingToCommute from "./steps/WillingToCommute";
import YourInterest from "./steps/YourInterest";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const stepComponents: StepComponents = {
    0: <GetName />,
    1: <YourInterest />,
    2: <PreferredGroupSize />,
    3: <WillingToCommute />,
  };

  return <>{stepComponents[step]}</>;
}
