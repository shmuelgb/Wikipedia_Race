// Import the functions you need from the SDKs you need
// import firebase from 'firebase';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  // signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithEmailAndPasswordAuth,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  // firestore,
} from "firebase/auth";
// import { useContext } from "react";
// import { UserContext } from "../hooks/UserProvider";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASSArmwf3gnQWl1r1u5NXZ7Nb5vN5mdgE",
  authDomain: "wikipedia-race.firebaseapp.com",
  projectId: "wikipedia-race",
  storageBucket: "wikipedia-race.appspot.com",
  messagingSenderId: "559659395632",
  appId: "1:559659395632:web:90c9c93aa4c7c041fe9bf5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.error(err);
    alert(err.message);
    console.log(app);
  }
};

//TODO: handle errors

const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    // await auth.signInWithEmailAndPassword(email, password);

    const userCredential = await signInWithEmailAndPasswordAuth(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    localStorage.setItem("user", JSON.stringify(user));
    // await db.collection('users').add({
    //     uid: user.uid,
    //     name,
    //     authProvider: 'local',
    //     email,
    // });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // return res;
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
