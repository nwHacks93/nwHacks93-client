import { db } from "@/lib/firestore/db";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "../../profile/[userID]/route";

export async function PATCH(req: NextRequest, { params }: { params: { userID: string } }) {
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
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, {
      points: (userDoc.data().points || 0) + 75
    });

    return NextResponse.json({ message: "Points incremented successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating points:", error);
    return NextResponse.json({ error: "Failed to update points" }, { status: 500 });
  }
}
