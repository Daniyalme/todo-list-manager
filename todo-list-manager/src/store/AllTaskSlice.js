import { createSlice } from "@reduxjs/toolkit";

const AllTasksSlice = createSlice({
  name: "tasks",
  initialState: { AllTasks: [] },
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
