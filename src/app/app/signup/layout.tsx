import landingCircle from "@/assets/icons/ladingCircle.svg";
import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Image
        className="absolute flex flex-col justify-center h-full -z-0"
        src={landingCircle}
        alt="landingCircle"
      />
      <div className="bg-green-basic h-[100vh]">{children}</div>
    </>
  );
}
