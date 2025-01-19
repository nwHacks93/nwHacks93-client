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
    const { id, name, age, goal, group_size, distance } = body;
    const docRef = await addDoc(collection(db, "users"), { id, name, age, goal, group_size, distance, points: 0 });

    return NextResponse.json({ id: docRef.id, message: "User added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}

const validateUserInput = (data: { id: string; name: string; age: string; goal: string; group_size: string; distance: string }) => {
  const errors: string[] = [];

  // Validate name
  if (!data.name) {
    errors.push("Name is required.");
  }

  if (!data.id) {
    errors.push("Name is required.");
  }

  // Validate age
  if (!data.age) {
    errors.push("Age is required.");
  } else {
    const ageNum = Number(data.age);
    if (isNaN(ageNum) || ageNum < 0) {
      errors.push("Age must be a valid positive number.");
    }
  }

  // Validate goal
  if (!data.goal) {
    errors.push("Goal is required.");
  }

  // Validate group size
  if (!data.group_size) {
    errors.push("Group size is required.");
  }

  // Validate distance
  if (!data.distance) {
    errors.push("Distance is required.");
  }

  return errors; // Return an array of error messages
};
