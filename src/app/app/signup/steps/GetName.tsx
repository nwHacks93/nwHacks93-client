import downArrow from "@/assets/icons/arrow_drop_down.svg";
import Image from "next/image";
import Button from "../components/Button";
import Indicator from "../components/Indicator";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { useState } from "react";

export default function GetName(props: { profile: Map<string, any>; setProfile: React.Dispatch<Map<string, any>> }) {
  const { handleNext } = useStepNavigation(4);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const handleContinue = () => {
    props.profile.set("name", name);
    props.profile.set("age", age);
    props.setProfile(props.profile);
    handleNext();
  };

  return (
    <div className='relative flex flex-col justify-center items-center pt-[5.2rem] z-10'>
      <h1 className='text-[#fff] text-4xl font-bold'>Get started</h1>
      <input
        className='bg-[#D9D9D9] w-[80%] mx-[2rem] p-4 mt-[8.25rem] rounded-[8px] placeholder-black text-gray-800 placeholder:font-bold placeholder:font-xl'
        placeholder='Enter your name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className='relative w-[80%] mx-[2rem] mt-[3rem]'>
        <select
          defaultValue=''
          className='w-full p-4 rounded-[8px] bg-[#D9D9D9] appearance-none pr-10 font-xl font-bold text-gray-600'
          onChange={(e) => setAge(Number(e.target.value))}
        >
          <option value={0}>Select your age</option>
          <option value={1}>18-24</option>
          <option value={2}>24-30</option>
          <option value={3}>30+</option>
        </select>
        <div className='absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none'>
          <Image src={downArrow} alt='downArrow' />
        </div>
      </div>

      <div className='pt-[2.5rem]'>
        <Indicator step={0} />
      </div>
      <div className='w-full pt-[2.5rem] flex justify-center'>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
