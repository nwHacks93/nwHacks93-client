"use client"
import React, { useState, useEffect } from "react";
import FooterNav from "@/app/components/footerNav";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/lib/firestore/auth";
import { Profile } from "../api/types";

const dummy_events = [
    {
        name: "The Rec Room",
        description: "Where gaming, gourmet eats, live entertainment, and good vibes collide for the ultimate hangout experience!",
        date_time: "February 2, 2024", // or "Feb 2, 2024 8:00 pm" if you prefer
        location: "855 Granville St. Vancouver, BC",
        attendees: 4,
        average_age: 20,
        color: "#638C6D", // background color for the card
        image: "/rec-room.avif",
    },
    {
        name: "The Rec Room",
        description: "Where gaming, gourmet eats, live entertainment, and good vibes collide for the ultimate hangout experience!",
        date_time: "February 2, 2024", // or "Feb 2, 2024 8:00 pm" if you prefer
        location: "855 Granville St. Vancouver, BC",
        attendees: 4,
        average_age: 20,
        color: "#638C6D", // background color for the card
        image: "/rec-room.avif",
    },
    {
        name: "The Rec Room",
        description: "Where gaming, gourmet eats, live entertainment, and good vibes collide for the ultimate hangout experience!",
        date_time: "February 2, 2024", // or "Feb 2, 2024 8:00 pm" if you prefer
        location: "855 Granville St. Vancouver, BC",
        attendees: 4,
        average_age: 20,
        color: "#638C6D", // background color for the card
        image: "/rec-room.avif",
    },
];

const EventsPage: React.FC = () => {
    const [user, setUser] = useState<Profile | null>(null); // State to hold user information
    const router = useRouter();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userID = localStorage.getItem("userEmail");
                const response = await fetch(`api/profile/${userID}`);
                const userDetails: Profile = await response.json();
                const details = await getUserDetails();
                if (!userDetails || !userID || userID != details.email) {
                router.push("/login"); // Redirect to login if no user is found
                } else {
                setUser(userDetails); // Set user information in state
                }
            } catch (error) {}
        };
    
        fetchUserDetails();
    }, [router]);
    
    return (
        <>
        <div className="flex min-h-screen flex-col bg-gray-50">
            <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
                <h2 className="text-3xl mt-4 font-normal tracking-wide text-gray-800 sm:text-xl">
                    Upcoming events
                </h2>
                {/* <img
                    src={user?.photoURL || "Profile Picture"} 
                    alt='Profile'
                    className='w-10 h-10 rounded-full border'
                /> */}
            </header>

            <main className="flex-1 overflow-auto p-4">
                {dummy_events.map((activity, index) => (
                <div
                    key={index}
                    className="mx-auto mb-6 w-full max-w-md rounded-xl p-4 text-white shadow-md"
                    style={{ backgroundColor: activity.color }}
                >

                    <div className="mb-2 flex items-start items-center justify-between">
                        <h1 className="text-xl font-bold">{activity.name}</h1>
                        <div className="text-right text-sm leading-tight">
                        {activity.location}
                        </div>
                    </div>

                    <hr className="my-2 border-white/30" />

                    <div className="mt-4 flex gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-col pr-2">
                            <p className="mb-2 text-base font-semibold">{activity.date_time}</p>
                            <p className="leading-relaxed mb-7">{activity.description}</p>

                            <div className="flex items-center justify-between sm:flex-col sm:items-start sm:justify-start sm:gap-1 text-sm font-light">
                                <span>Attendees - {activity.attendees}</span>
                                <span>Average Age - {activity.average_age}</span>
                            </div>
                        </div>

                        <div className="h-[150px] w-[110px] flex-shrink-0 overflow-hidden rounded-md">
                            <img
                                src={activity.image}
                                alt={activity.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            ))}
            </main>

            {/* Footer navigation */}
            <FooterNav />
        </div>
        </>
    );
};

export default EventsPage;
