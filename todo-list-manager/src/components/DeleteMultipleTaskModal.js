import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { db } from "../configs/DBConfig";
import { ref, set } from "firebase/database";

import { DeleteMultipleTaskActions } from "../store/DeleteMultipleTaskModalSlice";
import { tasksActions } from "../store/AllTaskSlice";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { grey } from "@mui/material/colors";

const DELETE_MULTIPLE_DB = (tasks) => {
  tasks.map((task) => {
    const reference = ref(db, "/tasks/" + task.id);
    set(reference, null);
    return 0;
  });
};

const DeleteMultipleTaskModal = () => {
  const ShowModal = useSelector((state) => state.deletemultipletask.ShowModal);
  const DeletingTasks = useSelector(
    (state) => state.deletemultipletask.DeletingTasks
  );
  const dispatch = useDispatch();

  const HideModal = () => {
    dispatch(DeleteMultipleTaskActions.HideModal());
  };
  const ModalCloseHandler = () => {
    HideModal();
  };
  const CancelButtonClickHandler = () => {
    HideModal();
  };

  const DeleteButtonClickHandler = (event) => {
    event.preventDefault();
    dispatch(tasksActions.deleteMultipleTasks([...DeletingTasks]));
    DELETE_MULTIPLE_DB([...DeletingTasks]);
    dispatch(DeleteMultipleTaskActions.RemoveAllTask());
    HideModal();
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
          {"Deleting " + DeletingTasks.length + " Tasks!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Tasks Below will be removed permenantly:"}
          </DialogContentText>
          {DeletingTasks.map((task) => (
            <DialogContentText mt={2} mb={2} ml={1} key={task.id}>
              {"▪️ " + task.name}
            </DialogContentText>
          ))}
          <DialogContentText>{"Are you sure?"}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={CancelButtonClickHandler}
            variant="text"
            sx={{ color: grey[700], borderRadius: 60 }}
          >
            Cancel
          </Button>
          <Button
            sx={{ borderRadius: 60 }}
            type="Submit"
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteMultipleTaskModal;
