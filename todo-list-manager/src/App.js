//Firebase DataBase Imports
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, get, child, ref, onValue, set } from "firebase/database";
import { app, db } from "./configs/DBConfig";

//React Imports
import React, { useState, useEffect, Fragment } from "react";

//Material UI & Emotion Imports
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import DeleteForever from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { css } from "@emotion/css";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Fade from "@mui/material/Fade";

//Components Import
import { tasksActions } from "./store/AllTaskSlice";
import { NewTaskModalActions } from "./store/NewTaskModalSlice";
import { DeleteMultipleTaskActions } from "./store/DeleteMultipleTaskModalSlice";
import NewTaskModal from "./components/NewTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import TaskTable from "./components/TaskTable";
import DeleteSingleTaskModal from "./components/DeleteSingleTaskModal";
import DeleteMultipleTaskModal from "./components/DeleteMultipleTaskModal";
import "./components/UI/BackgroundScreen.css";
import ColorButton from "./components/UI/ColorButton";

export const App = () => {
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

  const ShowDeleteMultipleTaskModal = useSelector(
    (state) => state.deletemultipletask.ShowModal
  );
  const MultipleDeletingTask = useSelector(
    (state) => state.deletemultipletask.DeletingTasks
  );

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.AllTasks);

  const [IsLoading, setIsLoading] = useState(true);
  const [IsSomeTaskSelected, setIsSomeTaskSelected] = useState(false);

  useEffect(() => {
    setIsSomeTaskSelected(MultipleDeletingTask.length > 0 ? true : false);
  }, [MultipleDeletingTask, IsSomeTaskSelected]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, "tasks/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const DB_TASKS = snapshot
            .val()
            .filter((task) => typeof task !== "undefined");

          setIsLoading(false);
          dispatch(tasksActions.setTasks(DB_TASKS));
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

  const DeleteButtonClickHandler = () => {
    dispatch(DeleteMultipleTaskActions.ShowModal());
  };

  const NewTaskButtonClickHandler = () => {
    dispatch(NewTaskModalActions.show());
  };

  const maxid =
    tasks.length === 0
      ? 1
      : Math.max(...tasks.map((taskobj) => parseInt(taskobj.id))) + 1;

  return (
    <Fragment>
      <div className="header">
        {IsLoading && (
          <Fade
            in={IsLoading}
            timeout={{ enter: 1000 }}
            style={{ transitionDelay: "300ms" }}
            className="inner-header flex"
          >
            <h1>Loading...</h1>
          </Fade>
        )}
        <div>
          {ShowNewTaskModal && <NewTaskModal maxid={maxid} />}
          {ShowEditTaskModal && <EditTaskModal task={EditingTask} />}
          {ShowDeleteSingleTaskModal && <DeleteSingleTaskModal />}
          {ShowDeleteMultipleTaskModal && <DeleteMultipleTaskModal />}
          {!IsLoading && (
            <Fade
              in={!IsLoading}
              timeout={{ enter: 1000 }}
              style={{ transitionDelay: "300ms" }}
            >
              <div
                className={css`
            position: relative;
            width: 60%;
            z-index=100;
            margin-left:20%;
            margin-right:20%;
            margin-top: 10%;
            background-color: #ffffff;
            border-radius: 23px;
            height:100%;
            `}
              >
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  }}
                  className={css`
                    padding: 1% 5% 0 5% !important;
                  `}
                >
                  <MenuIcon fontSize="large" color="primary" />
                  <Typography
                    sx={[{ flex: "1 1 100%" }, { pl: 1 }]}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                    color={"#212121"}
                    align="left"
                  >
                    {"Tasks"}
                  </Typography>
                  <div>
                    <Fade in={IsSomeTaskSelected}>
                      <Button
                        sx={[
                          { "&: hover": { color: red[900] } },
                          { color: red[700] },
                          { borderColor: red[700] },
                          { borderRadius: 60 },
                          { mr: 1, pl: 1, pr: 1 },
                        ]}
                        size="large"
                        variant="outlined"
                        startIcon={<DeleteForever />}
                        onClick={DeleteButtonClickHandler}
                      >
                        Delete
                      </Button>
                    </Fade>
                  </div>
                  <div>
                    <ColorButton
                      onClick={NewTaskButtonClickHandler}
                      startIcon={<AddCircleIcon />}
                      size="large"
                      sx={[{ borderRadius: 60 }]}
                    >
                      {/* <AddCircleIcon fontSize="medium" /> */}
                      {"Add"}
                    </ColorButton>
                  </div>
                </Toolbar>
                <div
                  className={css`
                    position: relative;
                    width: 90%;
                    padding-left: 5%;
                    padding-right: 5%;
                    padding-top: 5%;
                    padding-bottom: 5%;
                  `}
                >
                  <TaskTable items={tasks} />
                </div>
              </div>
            </Fade>
          )}
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </Fragment>
  );
};
