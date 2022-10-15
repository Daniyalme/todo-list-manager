import { initializeApp } from "firebase/app";
import { getDatabase, get, child, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjePKZ1IDFKo9Ikyloawr36whBxIZLAi0",
  authDomain: "todo-list-manger.firebaseapp.com",
  databaseURL: "https://todo-list-manger-default-rtdb.firebaseio.com",
  projectId: "todo-list-manger",
  storageBucket: "todo-list-manger.appspot.com",
  messagingSenderId: "465410454639",
  appId: "1:465410454639:web:5c69671e80db92e05a899a",
  measurementId: "G-H0SSD434R1",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
