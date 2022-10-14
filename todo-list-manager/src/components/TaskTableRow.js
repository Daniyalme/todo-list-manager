import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Icon } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { blue, red, blueGrey, green } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Done from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditIcon from "@mui/icons-material/Edit";

const TaskTableRow = (props) => {
  const { row } = props;
  const [ShowDetails, setShowDetails] = useState(false);
  const [IsChecked, setIsChecked] = useState(false);
  const [IsDone, setIsDone] = useState(row.state === "Done" ? true : false);

  return (
    <React.Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Checkbox></Checkbox>
        </TableCell>
        {/* <TableCell>
          <IconButton onClick={() => setShowDetails(!ShowDetails)}>
            {ShowDetails && <KeyboardArrowUpIcon />}
            {!ShowDetails && <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell
          component="th"
          scope="row"
          onClick={() => setShowDetails(!ShowDetails)}
        >
          {row.name}
        </TableCell>
        <TableCell onClick={() => setShowDetails(!ShowDetails)}>
          {row.duedate}
        </TableCell>
        <TableCell onClick={() => setShowDetails(!ShowDetails)}>
          {row.creationdate}
        </TableCell>
        <TableCell onClick={() => setShowDetails(!ShowDetails)}>
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
        <TableCell>
          <IconButton
            aria-label="markdone"
            title={!IsDone ? "Mark Done" : "Mark UnDone"}
            sx={{ "& :hover": { color: !IsDone ? green[700] : red[300] } }}
          >
            {!IsDone && <DoneAllIcon />}
            {IsDone && <RemoveDoneIcon />}
          </IconButton>
          <IconButton
            aria-label="edit"
            title="Edit"
            sx={{ "& :hover": { color: blue[500] } }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            title="Delete"
            sx={{ "& :hover": { color: red[600] } }}
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
        {/* Mark as Done Button<IconButton></IconButton> */}
        {/* Delete Button<IconButton></IconButton> */}
        {/* Edit Button<IconButton></IconButton> */}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={ShowDetails} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.name + " Details:"}
              </Typography>
              {row.description}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TaskTableRow;
