//Firebase DataBase Imports
import { initializeApp } from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, get, child, ref, onValue, set } from "firebase/database";
import { app, db } from "./configs/DBConfig";

//React Imports
import React, { useState, useEffect, Fragment } from "react";

//Material UI & Emotion Imports
import Button from "@mui/material/Button";

//Components Import
import Tasks from "./components/Tasks";
import { tasksActions } from "./store/AllTaskSlice";
import { NewTaskModalActions } from "./store/NewTaskModalSlice";
import NewTaskModal from "./components/NewTaskModal";
import TaskTable from "./components/TaskTable";

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
          setIsLoading(false);
          dispatch(tasksActions.setTasks(DB_TASKS));
          console.log("Data Received!");
        } else {
          console.log("No data available");
          setIsLoading(false);
          setIsAnyTaskAvailable(false);
        }
      })
      .catch((error) => {
        console.log("Error Occured");
        console.error(error);
        setIsLoading(false);
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
            <Button variant="contained" onClick={NewTaskButtonHandler}>
              New Task
            </Button>
          </div>
          {/* {IsAnyTaskAvailable && <Tasks items={tasks} />} */}
          {IsAnyTaskAvailable && <TaskTable items={tasks} />}
          {!IsAnyTaskAvailable && <p>No Task Here!</p>}
        </div>
      )}
    </Fragment>
  );
};
