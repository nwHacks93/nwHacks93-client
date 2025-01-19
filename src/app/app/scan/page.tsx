"use client";
import { FooterNav } from "@/lib/components/NavBar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { getUserDetails } from "@/lib/firestore/auth";

const QRCodeApp: React.FC = () => {
    // const qrData = "stellahan0819@gmail.com";
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
        const userDetails = await getUserDetails();
        if (!userDetails) {
            router.push("/login");
        } else {
            setUser(userDetails);
        }
        })();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#638C6D] text-white px-4">
            {/* Header */}
            <div className="text-2xl font-bold mb-6 text-center">
                Your QR Code
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user?.email}`}
                    alt="Generated QR Code"
                    className="w-64 h-64 object-contain"
                />
            </div>

            {/* Text */}
            <p className="text-lg mt-6 font-medium">
                Scan or share this QR Code
            </p>

            {/* Decorative Image */}
            <div className="w-full flex justify-end mt-12 pr-6">
                <img
                    src="/butter_pointing.png"
                    alt=""
                    className="w-full max-w-[200px] object-contain"
                />
            </div>

            {/* Footer */}
            <FooterNav />
        </div>
    );
};

export default QRCodeApp;
