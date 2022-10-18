import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { app, db } from "../configs/DBConfig";
import { ref, set } from "firebase/database";

import { css, cx } from "@emotion/css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteSingleTaskActions } from "../store/DeleteSingleTaskModalSlice";
import { DeleteMultipleTaskActions } from "../store/DeleteMultipleTaskModalSlice";
import { tasksActions } from "../store/AllTaskSlice";
import { grey } from "@mui/material/colors";

const DELETE_DB = (task) => {
  console.log(task);
  const refrence = ref(db, "/tasks/" + task.id);
  set(refrence, null);
};

const DeleteSingleTaskModal = () => {
  const ShowModal = useSelector((state) => state.deletesingletask.ShowModal);
  const DeletingTask = useSelector(
    (state) => state.deletesingletask.DeletingTask
  );
  const dispatch = useDispatch();

  const HideModal = () => {
    dispatch(DeleteSingleTaskActions.HideModal());
  };
  const ModalCloseHandler = () => {
    HideModal();
  };
  const CancelButtonClickHandler = () => {
    HideModal();
  };

  const DeleteButtonClickHandler = (event) => {
    event.preventDefault();
    dispatch(tasksActions.deleteMultipleTasks([DeletingTask]));
    dispatch(DeleteMultipleTaskActions.RemoveTask(DeletingTask));
    DELETE_DB(DeletingTask);
    dispatch(DeleteSingleTaskActions.HideModal());
  };

  return (
    <Dialog
      open={ShowModal}
      onClose={ModalCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <form onSubmit={DeleteButtonClickHandler}>
        <DialogTitle id="alert-dialog-title">
          {"Deleting " + DeletingTask.name + " Data!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"This action will delete this task permenantly."}
          </DialogContentText>
          <DialogContentText>{"Are you sure?"}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={CancelButtonClickHandler}
            variant="text"
            sx={{ color: grey[700] }}
          >
            Cancel
          </Button>
          <Button type="Submit" variant="contained" color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteSingleTaskModal;
