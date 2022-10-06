import React, { useState } from "react";
import Tasks from "./components/Tasks";

const INITIAL_TASKS = [
  {
    id: "1",
    name: "Task1",
    creationdate: new Date(2022, 2, 25),
    duedate: new Date(2022, 3, 27),
    state: "Pending",
    description: "Homework 1 is due to 2022/04/28",
  },
  {
    id: "2",
    name: "Task2",
    creationdate: new Date(2022, 3, 25),
    duedate: new Date(2022, 4, 27),
    state: "Pending",
    description: "Project 1 is due to 2022/10/02",
  },
  {
    id: "3",
    name: "Task3",
    creationdate: new Date(2022, 4, 25),
    duedate: new Date(2022, 5, 27),
    state: "Done",
    description: "Homework 2 is due to 2022/04/04",
  },
];

export const App = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [IsSelected, setIsSelected] = useState(false);
  console.log("App.js");
  return (
    <div>
      {/* button for adding new task */}
      <Tasks items={tasks} />
      {/* button for deleting using IsSelected */}
    </div>
  );
};
