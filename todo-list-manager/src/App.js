import React, { useState } from "react";
import Task from "./components/Task";

export const App = () => {
  const tasks = [
    {
      name: "Task1",
      date: new Date(2022, 2, 25),
    },
    {
      name: "Task2",
      date: new Date(2022, 3, 26),
    },
    {
      name: "Task3",
      date: new Date(2022, 4, 27),
    },
  ];
  return (
    <span>
      <Task item={tasks[0]} />
      <Task item={tasks[1]} />
      <Task item={tasks[2]} />
    </span>
  );
};
