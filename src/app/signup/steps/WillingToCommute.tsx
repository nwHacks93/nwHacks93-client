"use client";

import checkBox from "@/assets/icons/checkedBox.svg";
import uncheckedBox from "@/assets/icons/uncheckedBox.svg";
import Image from "next/image";
import { useState } from "react";
import Button from "../components/Button";
import Indicator from "../components/Indicator";
import { useStepNavigation } from "../hooks/useStepNavigation";

export default function WillingToCommute() {
  const { handleNext } = useStepNavigation(4);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const items = ["Waling distance", "<20 min", "20+ min"];

  const handleCheckboxChange = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="relative flex flex-col justify-center pl-[2rem] pt-[5.2rem] z-10">
      <h1 className="text-[#fff] text-4xl font-bold whitespace-pre">
        How far are you <br />
        willing to <br />
        commute?
      </h1>
      <div>
        <div className="mt-10">
          {items.map((item) => (
            <label
              key={item}
              className="flex items-center gap-x-2 gap-y-5 mb-8"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="hidden"
              />
              {selectedItems.includes(item) ? (
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
        <Indicator step={3} />
      </div>
      <div className="w-full pt-[2.5rem] flex justify-center">
        <Button onClick={handleNext}>StartConnecting</Button>
      </div>
    </div>
  );
}
