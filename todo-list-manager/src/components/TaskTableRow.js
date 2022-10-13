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
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const TaskTableRow = (props) => {
  const { row } = props;
  const [ShowDetails, setShowDetails] = useState(false);
  const [IsChecked, setIsChecked] = useState(false);

  return (
    <React.Fragment>
      <TableRow
        hover
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setShowDetails(!ShowDetails)}
      >
        <TableCell />
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.duedate}</TableCell>
        <TableCell>{row.creationdate}</TableCell>
        <TableCell>{row.state}</TableCell>

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
