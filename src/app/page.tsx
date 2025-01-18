import ladingCircle from "@/assets/icons/ladingCircle.svg";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image
        className="absolute flex flex-col justify-center h-full -z-0"
        src={ladingCircle}
        alt="ladingCircle"
      />
      <div className="bg-green-basic h-[100vh]">
        <div className="h-[100%] pt-[10rem] gap-[12.5rem] flex font-bold flex-col justify-center items-center whitespace-pre text-white-basic text-[45px] z-10">
          <div className="flex flex-col items-center">
            <h1>Welcome to _____!</h1>
            <h1 className="w-[100%] text-center text-[35px] whitespace-pre-wrap">
              {`Where you can connect \n ‘em all.`}
            </h1>
          </div>
          <button className="bg-[#3F3632] font-[#2rem] font-weight-[#500] w-[80%] z-10 py-[1.25rem] rounded-lg text-[25px]">
            Get Started!
          </button>
        </div>
      </div>
    </>
  );
}
