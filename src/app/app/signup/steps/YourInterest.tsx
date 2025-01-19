"use client";

import { useState } from "react";
import Button from "../components/Button";
import Indicator from "../components/Indicator";
import WordChip from "../components/WordChip";
import { useStepNavigation } from "../hooks/useStepNavigation";

export default function YourInterest(props: { profile: Map<string, any>; setProfile: React.Dispatch<Map<string, any>> }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { handleNext } = useStepNavigation(4);

  const list = [
    "Gaming",
    "Volunteering",
    "Cafe",
    "Sports",
    "Music",
    "Fashion",
    "Gym",
    "Running",
    "Hiking",
    "Cooking",
    "Puzzle",
    "Art",
    "Animals",
    "Parks"
  ];

  const handleSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleContinue = () => {
    props.profile.set("goal", selectedItems);
    props.setProfile(props.profile);
    handleNext();
  };

  return (
    <div className='relative flex flex-col justify-center pl-[2rem] pt-[5.2rem] z-10'>
      <h1 className='text-[#fff] text-4xl font-bold whitespace-pre'>
        What are your <br /> interests?
      </h1>

      <div className='py-[4rem] max-w-[80%] h-full pt-[2.5rem] flex flex-wrap gap-x-2 gap-y-4'>
        {list.map((item) => (
          <div key={item} onClick={() => handleSelect(item)}>
            <WordChip selected={selectedItems.includes(item)}>{item}</WordChip>
          </div>
        ))}
      </div>
      <div className='w-full pt-[2.5rem] flex justify-center'>
        <Indicator step={1} />
      </div>
      <div className='w-full pt-[2.5rem] flex justify-center'>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
