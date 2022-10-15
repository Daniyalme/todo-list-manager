import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewTaskModalActions } from "../store/NewTaskModalSlice";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IconButton } from "@mui/material";
import { css, cx } from "@emotion/css";

const NewTaskModal = (props) => {
  const dispatch = useDispatch();
  const ShowModal = useSelector((state) => state.newtaskmodal.ShowNewTaskModal);

  const InputNameHandler = (event) => {
    console.log(event.target.value);
  };

  const InputDescriptionHandler = (event) => {
    console.log(event.target.value);
  };

  const InputDueDateHandler = (event) => {
    console.log(event);
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

  return (
    <Dialog open={ShowModal} onClose={ModalCloseHandler}>
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
        <TextField
          autoFocus
          id="name"
          label="Task Name"
          type="email"
          fullWidth
          variant="outlined"
          onChange={InputNameHandler}
        />
        {/* <Input
          autoFocus
          id="duedate"
          label="Due To"
          type={"datetime-local"}
          variant="outlined"
          onChange={InputDueDateHandler}
        /> */}
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Date&Time picker"
            onChange={InputDueDateHandler}
          />
        </LocalizationProvider> */}
      </DialogContent>
      <Box>
        <form>
          <input
            type={"text"}
            placeholder={"Task Name"}
            onChange={InputNameHandler}
          />
          <input
            type={"text"}
            placeholder={"Description"}
            onChange={InputDescriptionHandler}
          />
          <button type="button" onClick={CloseButtonHandler}>
            Cancel
          </button>
          <button type="submit">Add Task</button>
        </form>
      </Box>
    </Dialog>
  );
};

export default NewTaskModal;
