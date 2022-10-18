import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TaskTableRow from "./TaskTableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TaskTable = (props) => {
  const [EmptyTasks, setEmptyTasks] = useState(true);
  const Tasks = useSelector((state) => state.tasks.AllTasks);

  useEffect(() => {
    setEmptyTasks(props.items.length === 0 ? true : false);
  }, [Tasks, EmptyTasks]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Due To</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {!EmptyTasks &&
              props.items.map((row) => <TaskTableRow key={row.id} row={row} />)}
            {EmptyTasks && (
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>No Task Found</TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TaskTable;
