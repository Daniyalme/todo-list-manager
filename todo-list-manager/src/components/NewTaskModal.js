import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app, db } from "../configs/DBConfig";
import { ref, set } from "firebase/database";

import { NewTaskModalActions } from "../store/NewTaskModalSlice";
import { tasksActions } from "../store/AllTaskSlice";

import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton } from "@mui/material";
import { css, cx } from "@emotion/css";

const AddTask_DB = (task) => {
  const refrence = ref(db, "/tasks/" + task.id);
  set(refrence, task);
};

const NewTaskModal = (props) => {
  const Today = new Date().toISOString();

  const dispatch = useDispatch();
  const ShowNewModal = useSelector(
    (state) => state.newtaskmodal.ShowNewTaskModal
  );
  const [TaskName, setTaskName] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  const [TaskDueDate, setTaskDueDate] = useState(
    Today.substring(0, 11) + "00:00:00.000Z"
  );

  const InputNameHandler = (event) => {
    setTaskName(event.target.value);
  };

  const InputDescriptionHandler = (event) => {
    setTaskDescription(event.target.value);
  };

  const InputDueDateHandler = (event) => {
    setTaskDueDate(event.target.value + ":00.000Z");
  };

  const HideModal = () => {
    dispatch(NewTaskModalActions.hide());
  };

  const CloseButtonHandler = () => {
    HideModal();
  };

  const ModalCloseHandler = () => {
    HideModal();
  };

  const SubmitFormHandler = (event) => {
    event.preventDefault();

    const task = {
      id: props.maxid,
      name: TaskName,
      creationdate: new Date().toISOString(),
      duedate: TaskDueDate,
      description: TaskDescription,
      state: "Pending",
    };
    dispatch(tasksActions.addTask(task));
    AddTask_DB(task);
    HideModal();
  };

  return (
    <Dialog
      open={ShowNewModal}
      onClose={ModalCloseHandler}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={SubmitFormHandler}>
        <DialogTitle>Add Task</DialogTitle>
        <IconButton
          className={css`
            position: absolute;
            right: 24px;
            top: 12px;
          `}
          onClick={CloseButtonHandler}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                id="name"
                label="Name"
                placeholder="Enter Task Name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={InputNameHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={css`
                  width: 100%;
                `}
                onChange={InputDueDateHandler}
                id="datetime-local"
                label="Due To"
                type="datetime-local"
                required
                defaultValue={Today.substring(0, 11) + "00:00"}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                placeholder="Enter Task Description"
                type="text"
                fullWidth
                variant="outlined"
                onChange={InputDescriptionHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid container marginTop={3} justifyContent={"flex-end"}>
              <Button variant="contained" size="large" type="submit">
                <AddIcon /> {"  Add"}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default NewTaskModal;
