import { db } from "@/lib/firestore/db";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "../../profile/[userID]/route";

export async function PATCH(req: NextRequest, { params }: { params: { userID: string } }) {
  const { userID } = await params;
  let body;

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: `Invalid request body, ${JSON.stringify(error, null, 2)}` }, { status: 400 });
  }

  const { scanID } = body;

  if (!validateEmail(userID) || !validateEmail(scanID)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    const usersRef = collection(db, "users");

    const q1 = query(usersRef, where("email", "==", userID));
    const querySnapshot = await getDocs(q1);
    const q2 = query(usersRef, where("email", "==", userID));
    const querySnapshotConn = await getDocs(q2);

    if (querySnapshot.empty || querySnapshotConn.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc1 = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc1.id);

    const userDoc2 = querySnapshotConn.docs[0];
    const userRef2 = doc(db, "users", userDoc2.id);

    await updateDoc(userRef, {
      points: (userDoc1.data().points || 0) + 75
    });
    await updateDoc(userRef2, {
      points: (userDoc2.data().points || 0) + 75
    });

    return NextResponse.json({ message: "Points incremented successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating points:", error);
    return NextResponse.json({ error: "Failed to update points" }, { status: 500 });
  }
}
