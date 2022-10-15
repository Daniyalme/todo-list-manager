import React, { useState } from "react";
import TaskTableRow from "./TaskTableRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const TaskTable = (props) => {
  const [EmptyTasks, setEmptyTasks] = useState(
    props.length === 0 ? true : false
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Task</TableCell>
            <TableCell>Due To</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {!EmptyTasks &&
            props.items.map((row) => <TaskTableRow key={row.id} row={row} />)}
          {EmptyTasks && <Box>No Task Found</Box>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
