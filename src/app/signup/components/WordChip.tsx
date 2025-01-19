export default function WordChip({ children }: { children: string }) {
  return (
    <div className="rounded-[2rem] border-2 border-[#3F3632] py-1 px-4 text-lg text-[#3F3632] font-bold">
      {children}
    </div>
  );
}
