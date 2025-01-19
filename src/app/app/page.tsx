"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserDetails, logout } from "@/lib/firestore/auth";
import { LogoutButton } from "@/lib/components/LogoutButton";
import { Profile } from "../api/types";
import { FooterNav } from "@/lib/components/NavBar";

const dummy_challenges = [
  {
    xp: 200,
    name: "The Rec Room",
    title: "Attend a large group activity!",
    color: "#DEB887"
  },
  {
    xp: 800,
    name: "The Rec Room",
    title: "Volunteer at a homeless shelter!",
    color: "#AE7645"
  },
  {
    xp: 100,
    name: "The Rec Room",
    title: "Reconnect with an old friend!",
    color: "#B1ACAA"
  },
  {
    xp: 600,
    name: "The Rec Room",
    title: "Visit a new city!",
    color: "#C6A94D"
  }
];

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]); // State to hold registered events
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const userID = localStorage.getItem("userEmail");
        const response = await fetch(`api/activities/user/${userID}`);
        const events = await response.json();
        console.log(events);
        setRegisteredEvents(events); // Set the registered events
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const userID = localStorage.getItem("userEmail");
        const response = await fetch(`api/profile/${userID}`);

        if (!response.ok) {
          router.push("/app/signup");
        }

        const userDetails: Profile = await response.json();
        console.log(userDetails);
        setUser(userDetails);
      } catch (error) {
        router.push("/app/signup");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
    fetchUserDetails();
  }, [router]);

  if (loading) {
    return (
      <div className='relative h-screen bg-gray-50'>
        <div className='text-black space-x-4 space-y-10 p-10'>Loading...</div>
      </div>
    );
  }

  return (
    // Container that fixes the viewport height
    <div className='relative h-screen bg-gray-50'>
      {/* Scrollable content area */}
      <div className='overflow-y-auto h-full p-6 pb-24'>
        {/* Header User Info */}
        <div className='flex items-center justify-between space-x-4 mb-10'>
          <span className='text-gray-700 text-2xl font-bold'>{user?.points || 0} xp</span>
          <div className='flex flex-col items-center justify-center'>
            <img
              src={user?.photoURL || "Profile Picture"} // Placeholder for user profile image
              alt='Profile'
              className='w-10 h-10 rounded-full border'
            />
            <button onClick={handleSignOut} className='text-gray-800'>
              signout
            </button>
          </div>
        </div>

        {/* Welcome Header */}
        <div className='flex justify-between items-center mb-8'>
          <div className='text-[#371B34] text-[30px] font-normal leading-normal'>
            Welcome back, <span className='font-bold'>{user?.name || "User"}!</span>
          </div>
        </div>

        {/* Available Challenges Section */}
        <div className='mb-6'>
          <h2 className='text-xl font-light mb-4 text-black'>Available Challenges</h2>
          <div className='grid grid-cols-2 gap-4'>
            {dummy_challenges.map((challenge, index) => (
              <div
                key={index}
                className='p-3 rounded-3xl text-white shadow-md flex justify-between items-center font-alegreya'
                style={{ backgroundColor: challenge.color }}
              >
                <div>
                  <p className='text-lg'>{challenge.xp} xp</p>
                  <h3 className='font-medium text-sm mt-2'>{challenge.title}</h3>
                  <button className='text-sm lg:text-lg font-bold mt-3 flex items-center justify-between'>
                    Start Challenge
                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 15 16' fill='none' className='ml-2'>
                      <path
                        d='M7.5 0.929443C3.36425 0.929443 0 4.17526 0 8.16474C0 12.1542 3.36425 15.4 7.5 15.4C11.6358 15.4 15 12.1542 15 8.16474C15 4.17526 11.6358 0.929443 7.5 0.929443ZM10.4816 8.41823L6.10658 11.1315C6.05531 11.1635 5.9961 11.1795 5.93751 11.1795C5.88624 11.1795 5.83436 11.1671 5.78798 11.1427C5.68726 11.0897 5.625 10.9884 5.625 10.878V5.4515C5.625 5.34111 5.68726 5.23981 5.78798 5.18682C5.88686 5.13442 6.01075 5.13764 6.10658 5.19801L10.4816 7.91125C10.5707 7.96659 10.625 8.06228 10.625 8.16474C10.625 8.26719 10.5707 8.36286 10.4816 8.41823Z'
                        fill='white'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registered Events Section */}
        <div>
          {registeredEvents.length > 0 && <h2 className='mt-10 text-xl font-light mb-4 text-black'>Registered Events</h2>}
          {registeredEvents.map((event, index) => {
            const { eventData } = event; // Destructure eventData
            const eventTime = new Date(eventData.activityTime.seconds * 1000); // Convert seconds to milliseconds
            const formattedTime = eventTime.toLocaleString(); // Format the date

            return (
              <div key={index} className='text-white p-6 rounded-3xl shadow-md mb-7' style={{ backgroundColor: "#47807F" }}>
                <div className='flex justify-between items-center'>
                  <h3 className='font-semibold text-2xl'>{eventData.name}</h3>
                  <p className='text-sm'>{formattedTime}</p>
                </div>
                <p className='text-sm mt-2'>{eventData.description}</p>
                <div className='flex space-x-2 mt-4'>
                  <span className='bg-gray-800 text-white text-xs px-3 py-1 rounded-lg'>{eventData.group_size}</span>
                  <span className='bg-gray-800 text-white text-xs px-3 py-1 rounded-lg'>{eventData.distance}</span>
                </div>
                <button className='flex justify-between items-center text-white text-m py-2 rounded-lg mt-2 font-bold'>
                  View Details
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 15 16' fill='none' className='ml-2'>
                    <path
                      d='M7.5 0.929443C3.36425 0.929443 0 4.17526 0 8.16474C0 12.1542 3.36425 15.4 7.5 15.4C11.6358 15.4 15 12.1542 15 8.16474C15 4.17526 11.6358 0.929443 7.5 0.929443ZM10.4816 8.41823L6.10658 11.1315C6.05531 11.1635 5.9961 11.1795 5.93751 11.1795C5.88624 11.1795 5.83436 11.1671 5.78798 11.1427C5.68726 11.0897 5.625 10.9884 5.625 10.878V5.4515C5.625 5.34111 5.68726 5.23981 5.78798 5.18682C5.88686 5.13442 6.01075 5.13764 6.10658 5.19801L10.4816 7.91125C10.5707 7.96659 10.625 8.06228 10.625 8.16474C10.625 8.26719 10.5707 8.36286 10.4816 8.41823Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer - fixed at bottom and overlays content */}
      <FooterNav />
    </div>
  );
};

export default DashboardPage;
