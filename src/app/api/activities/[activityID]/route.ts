import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore/db";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(req: NextRequest, { params }: { params: { activityID: string } }) {
  const { activityID } = params;

  try {
    const activitiesRef = collection(db, "activities");
    const activityQuery = query(activitiesRef, where("activityID", "==", activityID));
    const querySnapshot = await getDocs(activityQuery);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "No activities found for this activity ID" }, { status: 404 });
    }

    const registeredUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const eventDataRef = collection(db, "eventData");
    const eventQuery = query(eventDataRef, where("name", "==", activityID));
    const eventQuerySnapshot = await getDocs(eventQuery);

    const eventData = eventQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const response = {
      registeredUsers,
      eventData
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error retrieving activities and event data:", error);
    return NextResponse.json({ error: "Failed to retrieve activities and event data" }, { status: 500 });
  }
}
