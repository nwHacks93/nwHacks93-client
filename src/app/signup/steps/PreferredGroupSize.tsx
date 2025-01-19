"use client";

import checkBox from "@/assets/icons/checkedBox.svg";
import uncheckedBox from "@/assets/icons/uncheckedBox.svg";
import Image from "next/image";
import { useState } from "react";
import Button from "../components/Button";
import Indicator from "../components/Indicator";
import { useStepNavigation } from "../hooks/useStepNavigation";

export default function PreferredGroupSize() {
  const { handleNext } = useStepNavigation(4);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const items = ["One-on-One", "Small (3-5)", "Big groups (6+)"];

  const handleCheckboxChange = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="relative flex flex-col justify-center pl-[2rem] pt-[5.2rem] z-10">
      <h1 className="text-[#fff] text-4xl font-bold whitespace-pre">
        What is your <br /> preferred group <br /> size?
      </h1>
      <div>
        <div className="mt-10">
          {items.map((item) => (
            <label
              key={item}
              className="flex items-center gap-x-2 gap-y-5 mb-8"
            >
              <input
                type="radio"
                checked={selectedItem === item}
                onChange={() => handleCheckboxChange(item)}
                className="hidden"
              />
              {selectedItem === item ? (
                <Image src={checkBox} alt={checkBox} width={38} height={38} />
              ) : (
                <Image
                  src={uncheckedBox}
                  alt={uncheckedBox}
                  width={38}
                  height={38}
                />
              )}
              <span className="px-2 py-3 bg-[#D9D9D9] w-[80%] rounded-[0.6rem] font-bold font-alegreya_sans">
                {item}
              </span>
            </label>
          ))}
           
        </div>
      </div>
      <div className="w-full pt-[2.5rem] flex justify-center ">
        <Indicator step={2} />
      </div>
      <div className="w-full pt-[2.5rem] flex justify-center">
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}
