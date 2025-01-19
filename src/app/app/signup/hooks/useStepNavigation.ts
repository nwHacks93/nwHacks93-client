"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useStepNavigation = (totalSteps: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      setStep(parseInt(stepParam, 10));
    } else {
      router.replace("?step=0");
      setStep(0);
    }
  }, [searchParams, router]);

  const handleNext = () => {
    const nextStep = step + 1;
    if (nextStep < totalSteps) {
      router.push(`?step=${nextStep}`);
      setStep(nextStep);
    }
  };

  return {
    step,
    handleNext,
  };
};
