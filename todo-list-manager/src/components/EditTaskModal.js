import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../configs/DBConfig";
import { ref, set } from "firebase/database";

import { EditTaskModalActions } from "../store/EditTaskModalSlice";
import { tasksActions } from "../store/AllTaskSlice";
import ColorButton from "./UI/ColorButton";

import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { css } from "@emotion/css";

const EditTask_DB = (task) => {
  const refrence = ref(db, "/tasks/" + task.id);
  set(refrence, task);
};

const EditTaskModal = (props) => {
  let CurrentTask = props.task;

  const dispatch = useDispatch();
  const ShowEditTaskModal = useSelector(
    (state) => state.edittaskmodal.ShowEditTaskModal
  );

  const [TaskName, setTaskName] = useState(CurrentTask.name);
  const [TaskDescription, setTaskDescription] = useState(
    CurrentTask.description
  );
  const [TaskDueDate, setTaskDueDate] = useState(CurrentTask.duedate);

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
    dispatch(EditTaskModalActions.hide());
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
      id: CurrentTask.id,
      name: TaskName,
      creationdate: CurrentTask.creationdate,
      duedate: TaskDueDate,
      description: TaskDescription,
      state: CurrentTask.state,
    };
    dispatch(tasksActions.editTask(task));
    EditTask_DB(task);
    HideModal();
  };

  return (
    <Dialog
      open={ShowEditTaskModal}
      onClose={ModalCloseHandler}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={SubmitFormHandler}>
        <Box
          component="span"
          m={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <DialogTitle>Edit Task</DialogTitle>
          <div>
            <IconButton
              className={css`
                right: 10px;
              `}
              onClick={CloseButtonHandler}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Box>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                id="name"
                label="Name"
                defaultValue={CurrentTask.name}
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
                defaultValue={CurrentTask.duedate.substring(0, 16)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                defaultValue={CurrentTask.description}
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
              <ColorButton
                sx={{ borderRadius: 60 }}
                variant="contained"
                startIcon={<EditIcon />}
                size="large"
                type="submit"
              >
                {"  Edit"}
              </ColorButton>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditTaskModal;
