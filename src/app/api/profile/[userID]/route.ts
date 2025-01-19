import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore/db";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req: NextRequest, { params }: { params: { userID: string } }) {
  const { userID } = await params;

  if (!validateEmail(userID)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", userID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } else {
      const userData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
      return NextResponse.json(userData, { status: 200 });
    }
  } catch (error) {
    console.error("Error querying Firestore:", error);
    return NextResponse.json({ error: "Failed to retrieve user" }, { status: 500 });
  }
}

// Function to validate email format
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
