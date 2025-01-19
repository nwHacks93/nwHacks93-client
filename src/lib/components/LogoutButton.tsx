import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/firestore/auth";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className='mt-4 flex flex-row items-center justify-center w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-200'
    >
      <ArrowRightEndOnRectangleIcon height={50} color='white' />
      Logout
    </button>
  );
};
