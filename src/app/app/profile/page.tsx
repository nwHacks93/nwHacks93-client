"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { getUserDetails } from "@/lib/firestore/auth";
import FooterNav from "@/app/components/footerNav";

//----------------------------------
// Dummy Rewards for demonstration
//----------------------------------
const dummy_rewards = [
    {
        id: "r1",
        description: "15% off at BlueChip",
        xpCost: 600,
    },
    {
        id: "r2",
        description: "1 free ticket to FoodTruckFestival",
        xpCost: 1000,
    },
    {
        id: "r4",
        description: "1 free pottery class",
        xpCost: 2000,
    },
    {
        id: "r5",
        description: "$10 Voucher to Telus",
        xpCost: 5000,
    },
    {
        id: "r6",
        description: "$20 Voucher to Uncle Fatih's",
        xpCost: 6000,
    },
];

// --------------- XP CIRCLE with Transition ---------------
function XPCircle({ currentXP, maxXP }: { currentXP: number; maxXP: number }) {
  // Calculate the percentage (capped at 100%)
    const percentage = Math.min(currentXP / maxXP, 1);

    // Circle setup
    const radius = 90;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;

    // This state will hold the current strokeDashoffset, 
    // which we'll animate over 2 seconds.
    const [offset, setOffset] = useState<number>(circumference);

    useEffect(() => {
        // On mount or whenever `percentage` changes, 
        // set the circle offset to match the new fill.
        const finalOffset = circumference * (1 - percentage);
        setOffset(finalOffset);
    }, [percentage, circumference]);

    return (
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        <svg className="-rotate-90 w-full h-full" viewBox="0 0 200 200">
            {/* Background Circle */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
            />
            {/* Animated Progress Circle */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke="#371B34"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                    transition: "stroke-dashoffset 2s ease",
                }}
            />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-normal text-black">
            {currentXP} xp
            </span>
        </div>
        </div>
    );
}

// --------------- REWARD ITEM ---------------
function RewardItem({
    reward,
    canRedeem,
    onRedeem,
    }: {
    reward: { id: string; description: string; xpCost: number };
    canRedeem: boolean;
    onRedeem: (reward: any) => void;
    }) {
    return (
        <div className="flex items-center space-x-2">
        <div className="w-[60px] text-center py-5 rounded-md bg-[#FFF9C4] text-[#371B34] font-semibold border border-[#371B34]">
            {reward.xpCost} xp
        </div>

        <div
            className={`flex-1 px-4 py-5 rounded-md ${
            canRedeem ? "bg-[#638C6D] text-white" : "bg-gray-200 text-gray-400"
            }`}
        >
            {canRedeem ? (
            <button onClick={() => onRedeem(reward)}>{reward.description}</button>
            ) : (
            <button disabled>{reward.description}</button>
            )}
        </div>
        </div>
    );
}

// --------------- FAKE QR MODAL ---------------
function FakeQRModal({
    open,
    onClose,
    }: {
    open: boolean;
    onClose: () => void;
    }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-[#638C6D] p-6 rounded-md shadow-md w-[300px] relative flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Scan to Redeem!</h2>
            <div className="w-full flex items-center justify-center">
            <div className="w-[200px] h-[200px] flex items-center justify-center">
                <img
                src="/telusQR.png"
                alt="Profile"
                className="w-[200px] h-[200px]"
                />
            </div>
            </div>
            <button
            className="mt-4 px-4 py-2 bg-[#FFF6B3] text-[black] rounded"
            onClick={onClose}
            >
            Close
            </button>
        </div>
        </div>
    );
}

// --------------- PROFILE PAGE ---------------
const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [currentXP, setCurrentXP] = useState<number>(0);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const router = useRouter();
    const maxXP = 4000;

    useEffect(() => {
        (async () => {
        const userDetails = await getUserDetails();
        if (!userDetails) {
            router.push("/login");
        } else {
            setUser(userDetails);
            setCurrentXP(userDetails.points ?? 0);
        }
        })();
    }, [router]);

    // Simulate update function
    async function updateUserXp(newXp: number) {
        // e.g., call your Firestore update function here
        // await updateDoc(...)
        console.log("XP updated in Firestore to:", newXp);
    }

    // Separate rewards
    const availableRewards = dummy_rewards.filter((r) => r.xpCost <= currentXP);
    const lockedRewards = dummy_rewards.filter((r) => r.xpCost > currentXP);

    // Redeem Handler
    const handleRedeem = async (reward: { id: string; xpCost: number }) => {
        try {
        const newXP = currentXP - reward.xpCost;
        setCurrentXP(newXP);
        if (user?.uid) {
            await updateUserXp(newXP);
        }
        setQrModalOpen(true);
        } catch (err) {
        console.error("Error redeeming reward", err);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="p-8 flex items-center space-x-4">
                <img
                src={user?.photoURL || "Image"}
                alt="Profile"
                className="w-[100px] h-[100px] rounded-full border"
                />
                <div className="text-[#371B34] text-[30px] font-normal">
                {user?.displayName || "Butter User"}
                </div>
            </div>

            {/* XP Circle with 2s transition */}
            <div className="flex flex-col items-center">
                <XPCircle currentXP={currentXP} maxXP={maxXP} />
            </div>

            {/* Rewards */}
            <div className="p-6 bg-white">
                {/* Available Rewards */}
                <h2 className="text-2xl font-normal text-black mt-8">
                Available Rewards
                </h2>
                <div className="mt-4 space-y-4">
                {availableRewards.length > 0 ? (
                    availableRewards.map((reward) => (
                    <RewardItem
                        key={reward.id}
                        reward={reward}
                        canRedeem={true}
                        onRedeem={handleRedeem}
                    />
                    ))
                ) : (
                    <div className="text-gray-500">No rewards available yet.</div>
                )}
                </div>

                {/* Locked Rewards */}
                <h2 className="text-2xl font-normal text-black mt-10">
                Earn more XP to redeem...
                </h2>
                <div className="mt-4 space-y-4">
                {lockedRewards.length > 0 ? (
                    lockedRewards.map((reward) => (
                    <RewardItem
                        key={reward.id}
                        reward={reward}
                        canRedeem={false}
                        onRedeem={() => null}
                    />
                    ))
                ) : (
                    <div className="text-gray-500">
                    You can currently redeem all listed rewards!
                    </div>
                )}
                </div>
            </div>

            {/* Fake QR Code Modal */}
            <FakeQRModal open={qrModalOpen} onClose={() => setQrModalOpen(false)} />
            
            <FooterNav />
        </div>
    );
};

export default ProfilePage;
