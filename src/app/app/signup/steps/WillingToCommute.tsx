"use client";

import checkBox from "@/assets/icons/checkedBox.svg";
import uncheckedBox from "@/assets/icons/uncheckedBox.svg";
import Image from "next/image";
import { useState } from "react";
import Button from "../components/Button";
import Indicator from "../components/Indicator";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { useRouter } from "next/navigation";

export default function WillingToCommute(props: { profile: Map<string, any>; setProfile: React.Dispatch<Map<string, any>> }) {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const items = ["Walking distance", "< 20 min", "20+ min"];

  const handleCheckboxChange = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleContinue = async () => {
    // Set selected items in profile
    props.profile.set("distance", selectedItems);
    props.setProfile(props.profile);

    let body = Object.fromEntries(props.profile.entries());
    body.email = localStorage.getItem("userEmail");
    body.photoURL = localStorage.getItem("photoURL");
    console.log(body);

    let response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error("something went wrong");
    }

    router.push("/app");
  };

  return (
    <div className='relative flex flex-col justify-center pl-[2rem] pt-[5.2rem] z-10'>
      <h1 className='text-[#fff] text-4xl font-bold whitespace-pre'>
        How far are you <br />
        willing to <br />
        commute?
      </h1>
      <div>
        <div className='mt-10'>
          {items.map((item) => (
            <label key={item} className='flex items-center gap-x-2 gap-y-5 mb-8'>
              <input
                type='checkbox'
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className='hidden'
              />
              {selectedItems.includes(item) ? (
                <Image src={checkBox} alt={checkBox} width={38} height={38} />
              ) : (
                <Image src={uncheckedBox} alt={uncheckedBox} width={38} height={38} />
              )}
              <span className='px-2 py-3 bg-[#D9D9D9] w-[80%] rounded-[0.6rem] font-bold font-alegreya_sans'>{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div className='w-full pt-[2.5rem] flex justify-center '>
        <Indicator step={3} />
      </div>
      <div className='w-full pt-[2.5rem] flex justify-center'>
        <Button onClick={handleContinue}>Start Connecting</Button>
      </div>
    </div>
  );
}
