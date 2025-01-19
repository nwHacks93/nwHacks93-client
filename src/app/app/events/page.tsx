"use client";
import React, { useState, useEffect } from "react";
import { FooterNav } from "@/lib/components/NavBar";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/lib/firestore/auth";
import { Profile } from "@/app/api/types";

const dummy_events = [
  {
    name: "The Rec Room",
    description: "Where gaming, gourmet eats, live entertainment, and good vibes collide for the ultimate hangout experience!",
    date_time: "February 2, 2024", // or "Feb 2, 2024 8:00 pm" if you prefer
    location: "855 Granville St. Vancouver, BC",
    attendees: 4,
    average_age: 20,
    color: "#638C6D", // background color for the card
    image: "/rec-room.avif"
  },
  {
    name: "The Rec Room",
    description: "Where gaming, gourmet eats, live entertainment, and good vibes collide for the ultimate hangout experience!",
    date_time: "February 2, 2024", // or "Feb 2, 2024 8:00 pm" if you prefer
    location: "855 Granville St. Vancouver, BC",
    attendees: 4,
    average_age: 20,
    color: "#638C6D", // background color for the card
    image: "/rec-room.avif"
  },
  {
    name: "The Rec Room",
    description: "Where gaming, gourmet eats, live entertainment, and good vibes collide for the ultimate hangout experience!",
    date_time: "February 2, 2024", // or "Feb 2, 2024 8:00 pm" if you prefer
    location: "855 Granville St. Vancouver, BC",
    attendees: 4,
    average_age: 20,
    color: "#638C6D", // background color for the card
    image: "/rec-room.avif"
  }
];

const EventsPage: React.FC = () => {
  const [user, setUser] = useState<Profile | null>(null); // State to hold user information
  const [upcomingActivities, setUpcomingActivities] = useState<any[]>([]); // State for upcoming activities
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userID = localStorage.getItem("userEmail");
        const response = await fetch(`api/profile/${userID}`);
        const userDetails: Profile = await response.json();
        const details = await getUserDetails();
        if (!userDetails || !userID || !details || userID != details.email) {
          router.push("/login"); // Redirect to login if no user is found
        } else {
          setUser(userDetails); // Set user information in state
        }
      } catch (error) {}
    };

    const fetchUpcomingActivities = async () => {
      try {
        const response = await fetch(`/api/activities/upcoming`);
        const activities = await response.json();
        if (Array.isArray(activities)) {
          setUpcomingActivities(activities);
        } else {
          console.warn("Expected an array but got:", activities);
          setUpcomingActivities([]);
        }
      } catch (error) {
        console.error("Error fetching upcoming activities:", error);
        setUpcomingActivities([]);
      }
    };

    fetchUserDetails();
    fetchUpcomingActivities();
  }, [router]);

  return (
    <>
      <div className='relative h-screen bg-gray-50'>
        <header className='flex items-center justify-between bg-white px-4 py-3 shadow-sm'>
          <h2 className='text-3xl mt-4 font-normal tracking-wide text-gray-800 sm:text-xl'>Upcoming events</h2>
          {/* <img
                    src={user?.photoURL || "Profile Picture"} 
                    alt='Profile'
                    className='w-10 h-10 rounded-full border'
                /> */}
        </header>

        <main className='flex-1 overflow-auto p-4'>
          {upcomingActivities.map((activity, index) => {
            const activityTime = new Date(activity.activityTime.seconds * 1000);
            const formattedTime = activityTime.toLocaleString();

            return (
              <div key={index} className='text-white p-6 rounded-3xl shadow-md mb-7' style={{ backgroundColor: "#47807F" }}>
                <div className='flex justify-between items-center'>
                  <h3 className='font-semibold text-2xl'>{activity.name}</h3>
                  <p className='text-sm'>{formattedTime}</p>
                </div>
                <p className='text-sm mt-2'>{activity.description}</p>
                <div className='flex space-x-2 mt-4'>
                  <span className='bg-gray-800 text-white text-xs px-3 py-1 rounded-lg'>{activity.group_size}</span>
                  <span className='bg-gray-800 text-white text-xs px-3 py-1 rounded-lg'>{activity.distance}</span>
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
        </main>

        {/* Footer navigation */}
        <FooterNav />
      </div>
    </>
  );
};

export default EventsPage;
