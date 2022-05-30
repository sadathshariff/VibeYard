import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase.js";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  collection,
  orderBy,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { openToast } from "redux/features/toastSlice";
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

export const getAllPosts = createAsyncThunk("user/getAllPosts", async () => {
  let posts = [];
  try {
    const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, data: doc.data() });
    });
  } catch (error) {
    console.log("Error getting data", error);
  }
  return posts;
});

export const deletePost = async (postId, dispatch) => {
  try {
    await deleteDoc(doc(db, "posts", postId));
    dispatch(getAllPosts());
    dispatch(
      openToast({
        message: "Deleted Post Successfully",
        type: "success",
      })
    );
  } catch (error) {
    console.log("Error", error);
    dispatch(
      openToast({
        message: "Couldn't delete,Try after sometime",
        type: "error",
      })
    );
  }
};
