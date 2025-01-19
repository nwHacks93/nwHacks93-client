import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore/db";
import { addDoc, collection } from "firebase/firestore";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 403 });
  }

  const errors = validateUserInput(body);

  if (errors.length > 0) {
    return NextResponse.json({ error: "Invalid inputs", errors }, { status: 403 });
  }

  try {
    const { email, name, age, goal, group_size, distance, photoURL } = body;
    const docRef = await addDoc(collection(db, "users"), {
      email,
      name,
      age,
      goal,
      group_size,
      distance,
      points: 0,
      ...(photoURL ? { photoURL } : {})
    });

    return NextResponse.json({ id: docRef.id, message: "User added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}

const validateUserInput = (data: { email: string; name: string; age: string; goal: string; group_size: string; distance: string }) => {
  const errors: string[] = [];

  if (!data.name) {
    errors.push("Name is required.");
  }

  if (!data.email) {
    errors.push("Email is required.");
  }

  if (!data.age) {
    errors.push("Age is required.");
  } else {
    const ageNum = Number(data.age);
    if (isNaN(ageNum) || ageNum < 0) {
      errors.push("Age must be a valid positive number.");
    }
  }

  if (!data.goal) {
    errors.push("Goal is required.");
  }

  if (!data.group_size) {
    errors.push("Group size is required.");
  }

  if (!data.distance) {
    errors.push("Distance is required.");
  }

  return errors;
};
