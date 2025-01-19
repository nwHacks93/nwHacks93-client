import Button from "../components/Button";
import Indicator from "../components/Indicator";
import WordChip from "../components/WordChip";

export default function YourInterest() {
  return (
    <div className="relative flex flex-col justify-center pl-[2rem] pt-[5.2rem] z-10">
      <h1 className="text-[#fff] text-4xl font-bold whitespace-pre">
        What are your <br /> interests?
      </h1>
      <div className="py-[4rem] w-full pt-[2.5rem] flex justify-center">
        <WordChip>Gaming</WordChip>
      </div>
      <div className="w-full pt-[2.5rem] flex justify-center">
        <Indicator step={1} />
      </div>
      <div className="w-full pt-[2.5rem] flex justify-center">
        <Button>Continue</Button>
      </div>
    </div>
  );
}
