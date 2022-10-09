import { initializeApp } from "firebase/app";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, get, child, ref, onValue, set } from "firebase/database";

import Tasks from "./components/Tasks";
import { tasksActions } from "./store/AllTaskSlice";
import { NewTaskModalActions } from "./store/NewTaskModalSlice";
import NewTaskModal from "./components/NewTaskModal";

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

// const INITIAL_TASKS = [
//   {
//     id: "1",
//     name: "Task1",
//     creationdate: new Date(2022, 2, 25).toISOString(),
//     duedate: new Date(2022, 3, 27).toISOString(),
//     state: "Pending",
//     description: "Homework 1 is due to 2022/04/28",
//   },
//   {
//     id: "2",
//     name: "Task2",
//     creationdate: new Date(2022, 3, 25).toISOString(),
//     duedate: new Date(2022, 4, 27).toISOString(),
//     state: "Pending",
//     description: "Project 1 is due to 2022/10/02",
//   },
//   {
//     id: "3",
//     name: "Task127",
//     creationdate: new Date(2022, 4, 25).toISOString(),
//     duedate: new Date(2022, 5, 27).toISOString(),
//     state: "Done",
//     description: "Homework 2 is due to 2022/04/04",
//   },
// ];

// let DBTASKS = [];

// const getTasksDB = () => {
//   const db = getDatabase();
//   const reference = ref(db, "/tasks/");
//   onValue(reference, (snapshot) => {
//     console.log(snapshot.val());
//     DBTASKS = snapshot.val();
//   });
// };

// const AddTaskDB = (taskobj) => {
//   const db = getDatabase();
//   const reference = ref(db, "/tasks/" + taskobj.id);

//   set(reference, {
//     id: taskobj.id,
//     name: taskobj.name,
//     creationdate: taskobj.creationdate,
//     duedate: taskobj.duedate,
//     state: taskobj.state,
//     description: taskobj.description,
//   });
// };

// Initializing the Firebase with some tasks
// AddTaskDB(INITIAL_TASKS[0]);
// AddTaskDB(INITIAL_TASKS[1]);
// AddTaskDB(INITIAL_TASKS[2]);

// getTasksDB();

export const App = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [IsAnyTaskAvailable, setIsAnyTaskAvailable] = useState(true);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.AllTasks);
  const ShowNewTaskModal = useSelector(
    (state) => state.newtaskmodal.ShowNewTaskModal
  );

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, "tasks/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Getting Data from Database");
          const DB_TASKS = snapshot
            .val()
            .filter((task) => typeof task !== "undefined");
          dispatch(tasksActions.setTasks(DB_TASKS));
          setIsLoading(false);
        } else {
          console.log("No data available");
          setIsLoading(false);
          setIsAnyTaskAvailable(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const NewTaskButtonHandler = () => {
    dispatch(NewTaskModalActions.show());
  };

  return (
    <Fragment>
      {IsLoading && <div>Loading...</div>}
      {!IsLoading && (
        <div>
          {ShowNewTaskModal && (
            <NewTaskModal
              maxid={Math.max(...tasks.map((taskobj) => parseInt(taskobj.id)))}
            />
          )}
          <div>
            <button type="button" onClick={NewTaskButtonHandler}>
              New Task
            </button>
          </div>
          {IsAnyTaskAvailable && <Tasks items={tasks} />}
          {!IsAnyTaskAvailable && <p>No Task Here!</p>}
        </div>
      )}
    </Fragment>
  );
};
