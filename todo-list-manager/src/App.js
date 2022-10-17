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
import { tasksActions } from "./store/AllTaskSlice";
import { NewTaskModalActions } from "./store/NewTaskModalSlice";
import NewTaskModal from "./components/NewTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import TaskTable from "./components/TaskTable";
import DeleteSingleTaskModal from "./components/DeleteSingleTaskModal";

export const App = () => {
  const [IsLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.AllTasks);

  const ShowNewTaskModal = useSelector(
    (state) => state.newtaskmodal.ShowNewTaskModal
  );

  const ShowEditTaskModal = useSelector(
    (state) => state.edittaskmodal.ShowEditTaskModal
  );
  const EditingTask = useSelector((state) => state.edittaskmodal.EditingTask);

  const ShowDeleteSingleTaskModal = useSelector(
    (state) => state.deletesingletask.ShowModal
  );
  const SingleDeletingTask = useSelector(
    (state) => state.deletesingletask.DeletingTask
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
          dispatch(tasksActions.setTasks([]));
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

  console.log("App.js Edit:", EditingTask);
  console.log("App.js", ShowEditTaskModal);
  const maxid =
    tasks.length === 0
      ? 1
      : Math.max(...tasks.map((taskobj) => parseInt(taskobj.id))) + 1;

  return (
    <Fragment>
      {IsLoading && <div>Loading...</div>}
      {!IsLoading && (
        <div>
          {ShowNewTaskModal && (
            <NewTaskModal
              maxid={
                Math.max(...tasks.map((taskobj) => parseInt(taskobj.id))) + 1
              }
            />
          )}
          {ShowEditTaskModal && <EditTaskModal task={EditingTask} />}
          {ShowDeleteSingleTaskModal && <DeleteSingleTaskModal />}
          <div>
            <Button variant="contained" onClick={NewTaskButtonHandler}>
              New Task
            </Button>
          </div>
          {/* {IsAnyTaskAvailable && <Tasks items={tasks} />} */}
          <TaskTable items={tasks} />
        </div>
      )}
    </Fragment>
  );
};
