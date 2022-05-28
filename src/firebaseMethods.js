import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase.js";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
export const createUser = async (userName, email, password, userId) => {
  try {
    await setDoc(doc(db, "users", userId), {
      userName,
      email,
      password,
      bio: "",
      website: "",
      photoUrl: "",
      followers: [],
      following: [],
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.log("Error creating user", error);
  }
};

export const getLoggedInUserData = createAsyncThunk(
  "user/getLoggedInUserData",
  async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (error) {
      console.log("Error getting data", error);
    }
  }
);
