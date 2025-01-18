"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserDetails } from "@/lib/db/auth"; // Adjust the import based on your file structure

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null); // State to hold user information
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      if (!userDetails) {
        router.push("/login"); // Redirect to login if no user is found
      } else {
        setUser(userDetails); // Set user information in state
      }
    };

    fetchUserDetails();
  }, [router]);

  return (
    <div className='bg-pastel-blue flex items-center justify-center min-h-screen'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-sm w-full'>
        <h1 className='text-3xl font-semibold text-center text-pastel-purple mb-4'>Dashboard</h1>
        {user ? (
          <div>
            <p className='text-lg'>Welcome, {user.displayName || "User"}!</p>
            <p className='text-gray-600'>Email: {user.email}</p>
            <p className='text-gray-600'>UID: {user.uid}</p>
          </div>
        ) : (
          <p className='text-lg'>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
