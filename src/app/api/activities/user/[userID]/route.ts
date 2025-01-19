import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore/db"; // Ensure this path is correct
import { collection, getDocs, query, where } from "firebase/firestore";

// GET method for retrieving activities and corresponding event data by userID
export async function GET(req: NextRequest, { params }: { params: { userID: string } }) {
  const { userID } = await params;

  if (!validateEmail(userID)) {
    return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
  }

  try {
    const activitiesRef = collection(db, "activities");
    const userActivitiesQuery = query(activitiesRef, where("email", "==", userID)); // Query for activities by user email
    const activitiesSnapshot = await getDocs(userActivitiesQuery);

    if (activitiesSnapshot.empty) {
      return NextResponse.json([], { status: 404 });
    }

    const activityIDs = activitiesSnapshot.docs.map((doc) => doc.data().activityID);

    const eventDataRef = collection(db, "eventData");
    const eventDataPromises = activityIDs.map((act) => {
      const eventQuery = query(eventDataRef, where("name", "==", act));
      return getDocs(eventQuery);
    });

    const eventDataSnapshots = await Promise.all(eventDataPromises);

    const activitiesWithEventData = activitiesSnapshot.docs.map((activityDoc, index) => {
      const activityData = activityDoc.data();
      const eventData = eventDataSnapshots[index].docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
      return { ...activityData, eventData }; // Combine activity data with event data
    });

    return NextResponse.json(activitiesWithEventData, { status: 200 });
  } catch (error) {
    console.error("Error retrieving activities and event data:", error);
    return NextResponse.json({ error: "Failed to retrieve activities and event data" }, { status: 500 });
  }
}

// Function to validate email format
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
