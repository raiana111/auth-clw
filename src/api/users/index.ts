import { doc, setDoc, getDoc } from 'firebase/firestore'
import { IProfile } from "../../types";
import { db } from "../../firebase";

export const setUser = async (
    userId: string,
    userData: Omit<IProfile, "id" | "userId">
  ) => {
    try {
      const userDoc = doc(db, "users", userId);
      await setDoc(userDoc, {
        ...userData,
        createdAt: new Date(),
        userId: userId,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };

  export const getUserById = async (userId: string): Promise<IProfile | null> => {
    try {
      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        return {
          id: userSnapshot.id,
          ...userSnapshot.data(),
        } as IProfile;
      }
      return null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  };