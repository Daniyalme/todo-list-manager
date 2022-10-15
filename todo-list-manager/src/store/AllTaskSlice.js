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
      const objIndex = state.AllTasks.findIndex(
        (obj) => obj.id === action.payload.id
      );
      state.AllTasks[objIndex] = action.payload;
    },
    deleteTask(state, action) {
      state.AllTasks = state.AllTasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    deleteMultipleTasks(state, action) {
      const DeleteTasksId = action.payload.map((task) => task.id);
      state.AllTasks = state.AllTasks.filter(
        (task) => !DeleteTasksId.includes(task.id)
      );
    },
  },
});

export const tasksActions = AllTasksSlice.actions;

export default AllTasksSlice.reducer;
