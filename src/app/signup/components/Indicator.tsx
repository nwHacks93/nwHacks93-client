export default function Indicator({ step }: { step: number }) {
  const totalSteps = 4;

  return (
    <div className="px-3 py-2 bg-[#BFBFBF] bg-opacity-45 rounded-[16px] flex items-center gap-[0.5rem]">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`rounded-full w-2 h-2 ${
            index === step ? "bg-black" : "bg-black bg-opacity-5"
          }`}
        ></div>
      ))}
    </div>
  );
}
