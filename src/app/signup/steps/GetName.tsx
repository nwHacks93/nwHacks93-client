import downArrow from "@/assets/icons/arrow_drop_down.svg";
import Image from "next/image";
import Button from "../components/Button";
import Indicator from "../components/Indicator";
import { useStepNavigation } from "../hooks/useStepNavigation";

export default function GetName() {
  const { handleNext } = useStepNavigation(4);
  return (
    <div className="relative flex flex-col justify-center items-center pt-[5.2rem] z-10">
      <h1 className="text-[#fff] text-4xl font-bold">Get started</h1>
      <input
        className="bg-[#D9D9D9] w-[80%] mx-[2rem] p-4 mt-[8.25rem] rounded-[8px] placeholder-black placeholder:font-bold placeholder:font-xl"
        placeholder="Enter your name"
      />
      <div className="relative w-[80%] mx-[2rem] mt-[3rem]">
        <select
          defaultValue=""
          className="w-full p-4 rounded-[8px] bg-[#D9D9D9] appearance-none pr-10 font-xl font-bold"
        >
          <option value="">Select your age</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
          <Image src={downArrow} alt="downArrow" />
        </div>
      </div>

      <div className="pt-[2.5rem]">
        <Indicator step={0} />
      </div>
      <div className="w-full pt-[2.5rem] flex justify-center">
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}
