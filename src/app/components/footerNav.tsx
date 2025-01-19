"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HomeIcon, UserIcon, CalendarDaysIcon, QrCodeIcon } from "@heroicons/react/24/outline";

export const FooterNav: React.FC = () => {
  const pathname = usePathname() || "";
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div
      className='fixed bottom-0 w-full left-0 right-0 bg-[white] text-gray-700 z-50 
                    flex justify-around py-3 border-t'
    >
      {/* Home */}
      <Link href='/app' className='flex flex-col items-center'>
        <HomeIcon className={`h-6 w-6 ${isActive("/app") ? "text-[#3F3632]" : "text-gray-500"}`} />
        <span className={`text-sm ${isActive("/app") ? "text-[#3F3632]" : "text-gray-500"}`}>Home</span>
      </Link>

      {/* Profile (and sub-routes, e.g. /app/profile/rewards) */}
      <Link href='/app/profile' className='flex flex-col items-center'>
        <UserIcon className={`h-6 w-6 ${isActive("/app/profile") ? "text-[#3F3632]" : "text-gray-500"}`} />
        <span className={`text-sm ${isActive("/app/profile") ? "text-[#3F3632]" : "text-gray-500"}`}>Profile</span>
      </Link>

      {/* Events */}
      <Link href='/app/events' className='flex flex-col items-center'>
        <CalendarDaysIcon className={`h-6 w-6 ${isActive("/app/events") ? "text-[#3F3632]" : "text-gray-500"}`} />
        <span className={`text-sm ${isActive("/app/events") ? "text-[#3F3632]" : "text-gray-500"}`}>Upcoming Events</span>
      </Link>

      {/* Scan Points */}
      <Link href='/app/scan' className='flex flex-col items-center'>
        <QrCodeIcon className={`h-6 w-6 ${isActive("/app/scan") ? "text-[#3F3632]" : "text-gray-500"}`} />
        <span className={`text-sm ${isActive("/app/scan") ? "text-[#3F3632]" : "text-gray-500"}`}>Scan Points</span>
      </Link>
    </div>
  );
};
