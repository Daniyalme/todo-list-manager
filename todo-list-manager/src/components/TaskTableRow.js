import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { tasksActions } from "../store/AllTaskSlice";
import { EditTaskModalActions } from "../store/EditTaskModalSlice";
import { DeleteSingleTaskActions } from "../store/DeleteSingleTaskModalSlice";
import { DeleteMultipleTaskActions } from "../store/DeleteMultipleTaskModalSlice";

import { db } from "../configs/DBConfig";
import { ref, set } from "firebase/database";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import InfoIcon from "@mui/icons-material/Info";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { blue, red, blueGrey, green } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import EditIcon from "@mui/icons-material/Edit";

const EditTask_DB = (task) => {
  const refrence = ref(db, "/tasks/" + task.id);
  set(refrence, task);
};

const TaskTableRow = (props) => {
  const { row } = props;
  const [ShowDetails, setShowDetails] = useState(false);
  const [IsDone, setIsDone] = useState(row.state === "Done" ? true : false);
  const dispatch = useDispatch();

  const MarkDoneButtonClickHandler = () => {
    let new_row = { ...row };
    new_row.state = IsDone ? "Pending" : "Done";
    dispatch(tasksActions.editTask(new_row));
    EditTask_DB(new_row);
    setIsDone(!IsDone);
  };

  const DeleteButtonClickHandler = () => {
    dispatch(DeleteSingleTaskActions.ShowModal(row));
    // dispatch(tasksActions.deleteMultipleTasks([row]));
  };

  const EditButtonClickHandler = () => {
    dispatch(EditTaskModalActions.show(row));
  };

  const CheckBoxChangeHandler = (event) => {
    if (event.target.checked) {
      dispatch(DeleteMultipleTaskActions.AddTask(row));
    } else {
      dispatch(DeleteMultipleTaskActions.RemoveTask(row));
    }
  };

  return (
    <React.Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell padding="checkbox">
          <Checkbox onChange={CheckBoxChangeHandler}></Checkbox>
        </TableCell>
        <TableCell
          align="center"
          component="th"
          scope="row"
          onClick={() => setShowDetails(!ShowDetails)}
        >
          {row.name}
        </TableCell>
        <TableCell align="center" onClick={() => setShowDetails(!ShowDetails)}>
          {row.duedate.substring(0, 10) + " " + row.duedate.substring(11, 16)}
        </TableCell>
        <TableCell align="center" onClick={() => setShowDetails(!ShowDetails)}>
          {row.creationdate.substring(0, 10) +
            " " +
            row.creationdate.substring(11, 16)}
        </TableCell>
        <TableCell align="center" onClick={() => setShowDetails(!ShowDetails)}>
          {row.state}
          {IsDone && (
            <IconButton>
              <TaskAltIcon color="success" />
            </IconButton>
          )}
          {!IsDone && (
            <IconButton>
              <PendingActionsIcon sx={{ color: blue[300] }} />
            </IconButton>
          )}
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="markdone"
            title={!IsDone ? "Mark as Done" : "Mark as Pending"}
            sx={{ "& :hover": { color: !IsDone ? green[700] : red[300] } }}
            onClick={MarkDoneButtonClickHandler}
          >
            {!IsDone && <DoneAllIcon />}
            {IsDone && <RemoveDoneIcon />}
          </IconButton>
          <IconButton
            aria-label="edit"
            title="Edit"
            sx={{ "& :hover": { color: blue[500] } }}
            onClick={EditButtonClickHandler}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            title="Delete"
            sx={{ "& :hover": { color: red[600] } }}
            onClick={DeleteButtonClickHandler}
          >
            <DeleteForeverIcon />
          </IconButton>
          <IconButton
            aria-label="info"
            title="Show Info"
            sx={{ "& :hover": { color: blueGrey[800] } }}
            onClick={() => setShowDetails(!ShowDetails)}
          >
            <InfoIcon variant="filled" />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={ShowDetails} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {IsDone && <DoneAllIcon fontSize="small" color="success" />}
                {!IsDone && (
                  <PendingActionsIcon fontSize="small" color="primary" />
                )}
                {" " + row.name + " Details:"}
              </Typography>
              {row.description !== "" && row.description}
              {row.description === "" && "No Description Available"}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TaskTableRow;
