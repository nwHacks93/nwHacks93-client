"use client";

import checkBox from "@/assets/icons/checkedBox.svg";
import uncheckedBox from "@/assets/icons/uncheckedBox.svg";
import Image from "next/image";
import { useState } from "react";
import Button from "../components/Button";
import Indicator from "../components/Indicator";
import { useStepNavigation } from "../hooks/useStepNavigation";

export default function PreferredGroupSize(props: { profile: Map<string, any>; setProfile: React.Dispatch<Map<string, any>> }) {
  const { handleNext } = useStepNavigation(4);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const items = [
    ["One-on-One", "one-on-one"],
    ["Small (3-5)", "small"],
    ["Big groups (6+)", "large"]
  ];

  const handleCheckboxChange = (item: string) => {
    setSelectedItem(item);
  };

  const handleContinue = () => {
    // Set selected group size in profile
    props.profile.set("group_size", selectedItem);
    props.setProfile(props.profile);
    handleNext();
  };

  return (
    <div className='relative flex flex-col justify-center pl-[2rem] pt-[5.2rem] z-10'>
      <h1 className='text-[#fff] text-4xl font-bold whitespace-pre'>
        What is your <br /> preferred group <br /> size?
      </h1>
      <div>
        <div className='mt-10'>
          {items.map((item) => (
            <label key={item[0]} className='flex items-center gap-x-2 gap-y-5 mb-8'>
              <input type='radio' checked={selectedItem === item[1]} onChange={() => handleCheckboxChange(item[1])} className='hidden' />
              {selectedItem === item[1] ? (
                <Image src={checkBox} alt={checkBox} width={38} height={38} />
              ) : (
                <Image src={uncheckedBox} alt={uncheckedBox} width={38} height={38} />
              )}
              <span className='px-2 py-3 bg-[#D9D9D9] w-[80%] rounded-[0.6rem] font-bold font-alegreya_sans'>{item[0]}</span>
            </label>
          ))}
           
        </div>
      </div>
      <div className='w-full pt-[2.5rem] flex justify-center '>
        <Indicator step={2} />
      </div>
      <div className='w-full pt-[2.5rem] flex justify-center'>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
