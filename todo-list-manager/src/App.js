import React, { useState } from "react";
import Tasks from "./components/Tasks";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { InsertInvitation } from "@mui/icons-material";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const addTaskDB = (db, task) => {
  //Change the Function for single Task Add
  return 0;
};

const INITIAL_TASKS = [
  {
    id: "1",
    name: "Task1",
    creationdate: new Date(2022, 2, 25).toISOString(),
    duedate: new Date(2022, 3, 27).toISOString(),
    state: "Pending",
    description: "Homework 1 is due to 2022/04/28",
  },
  {
    id: "2",
    name: "Task2",
    creationdate: new Date(2022, 3, 25).toISOString(),
    duedate: new Date(2022, 4, 27).toISOString(),
    state: "Pending",
    description: "Project 1 is due to 2022/10/02",
  },
  {
    id: "3",
    name: "Task3",
    creationdate: new Date(2022, 4, 25).toISOString(),
    duedate: new Date(2022, 5, 27).toISOString(),
    state: "Done",
    description: "Homework 2 is due to 2022/04/04",
  },
];

const AddTaskDB = (taskobj) => {
  const db = getDatabase();
  const reference = ref(db, "/tasks/");

  push(reference, {
    id: taskobj.id,
    name: taskobj.name,
    creationdate: taskobj.creationdate,
    duedate: taskobj.duedate,
    state: taskobj.state,
    description: taskobj.description,
  });
};

const GetTasksDB = () => {
  const db = getDatabase();
  const reference = ref(db, "/tasks/");
  onValue(reference, (snapshot) => {
    console.log(snapshot.val());
  });
};

//Initializing the Firebase with some tasks
// AddTaskDB(INITIAL_TASKS[0]);
// AddTaskDB(INITIAL_TASKS[1]);
// AddTaskDB(INITIAL_TASKS[2]);
console.log("Set Firebase!");
GetTasksDB();

export const App = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [IsSelected, setIsSelected] = useState(false);
  console.log("App.js");
  return (
    <div>
      {/* button for adding new task */}
      <Tasks items={tasks} />
      {/* button for deleting using IsSelected */}
    </div>
  );
};
