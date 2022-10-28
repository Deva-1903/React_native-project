import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAlURnab0-M1TeRb6QiLAcxTX1F9CFPjQ",
  authDomain: "pie-chips.firebaseapp.com",
  databaseURL: "https://pie-chips-default-rtdb.firebaseio.com",
  projectId: "pie-chips",
  storageBucket: "pie-chips.appspot.com",
  messagingSenderId: "737803248370",
  appId: "1:737803248370:web:d738befb657b527a6ae66b",
};
// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };
