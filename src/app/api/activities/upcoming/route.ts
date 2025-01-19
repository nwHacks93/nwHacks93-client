import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore/db"; // Ensure this path is correct
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";

// GET method for retrieving activities by userID
export async function GET(req: NextRequest) {
  try {
    const activitiesRef = collection(db, "eventData");
    const currentTime = Timestamp.now();
    const q = query(activitiesRef, where("activityTime", ">", currentTime));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "No upcoming activities found" }, { status: 404 });
    }

    const activities = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    console.error("Error retrieving activities:", error);
    return NextResponse.json({ error: "Failed to retrieve activities" }, { status: 500 });
  }
}
