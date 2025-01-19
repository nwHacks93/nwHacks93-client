import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore/db";
import { addDoc, collection, getDocs, query, where, Timestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { email, activityID } = body;
  const errors = validateActivityInput({ email, activityID });

  if (errors.length > 0) {
    return NextResponse.json({ error: "Invalid inputs", errors }, { status: 403 });
  }

  try {
    const docRef = await addDoc(collection(db, "activities"), {
      email,
      activityID
    });

    return NextResponse.json({ id: docRef.id, message: "Activity created successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding activity:", error);
    return NextResponse.json({ error: "Failed to add activity" }, { status: 500 });
  }
}

const validateActivityInput = (data: { email: string; activityID: string }) => {
  const errors: string[] = [];

  if (!data.email) {
    errors.push("Email is required.");
  }

  if (!data.activityID) {
    errors.push("Activity ID is required.");
  }

  return errors;
};
