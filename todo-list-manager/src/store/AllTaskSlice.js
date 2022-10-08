import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, onValue, set } from "firebase/database";

const INITIAL_TASKS = [
  {
    id: "1",
    name: "Task1",
    creationdate: new Date(2022, 2, 25).toISOString(),
    duedate: new Date(2022, 3, 27).toISOString(),
    state: "Pending",
    description: "Homework 1 is due to 2022/04/28",
  },
  {
    id: "2",
    name: "Task2",
    creationdate: new Date(2022, 3, 25).toISOString(),
    duedate: new Date(2022, 4, 27).toISOString(),
    state: "Pending",
    description: "Project 1 is due to 2022/10/02",
  },
  {
    id: "3",
    name: "Task127",
    creationdate: new Date(2022, 4, 25).toISOString(),
    duedate: new Date(2022, 5, 27).toISOString(),
    state: "Done",
    description: "Homework 2 is due to 2022/04/04",
  },
];

const AllTasksSlice = createSlice({
  name: "tasks",
  initialState: { AllTasks: INITIAL_TASKS },
  reducers: {
    setTasks(state, action) {
      state.AllTasks = action.payload;
    },
    addTask(state, action) {
      state.AllTasks = [...state.AllTasks, action.payload];
    },
    editTask(state, action) {
      state.AllTasks = [...state.AllTasks, action.payload];
    },
    deleteTask(state, action) {
      //delete the payload from the tasks
    },
  },
});

export const tasksActions = AllTasksSlice.actions;

export default AllTasksSlice.reducer;
