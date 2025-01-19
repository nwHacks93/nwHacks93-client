interface WordChipProps {
  children: string;
  selected: boolean;
}

export default function WordChip({ children, selected }: WordChipProps) {
  return (
    <div
      className={`rounded-[2rem] border-2 py-1 px-5 text-lg font-bold border-[#3F3632] text-[#3F3632] ${
        selected && "bg-[#fff] text-white"
      }`}
    >
      {" "}
      {children}
    </div>
  );
}
