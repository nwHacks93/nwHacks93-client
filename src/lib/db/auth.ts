import { FirebaseApp } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, User, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(FirebaseApp);
const provider = new GoogleAuthProvider();

// pop-up oauth sign in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    document.cookie = `authToken=${token}; path=/; Secure; HttpOnly`; // persist

    console.log("User signed in: ", user);
  } catch (error) {
    console.error("Error during sign-in: ", error);
  }
};

// performs callback if user is signed in
export const checkUserSignedIn = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      document.cookie = `authToken=${token}; path=/; Secure; HttpOnly`; // persist

      console.log("User is signed in: ", user);

      callback(user);
    } else {
      console.log("No user is signed in.");
      callback(null);
    }
  });
};
