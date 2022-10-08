import { createSlice } from "@reduxjs/toolkit";

const NewTaskModalInitialState = { ShowNewTaskModal: false };

const NewTaskModalSlice = createSlice({
  name: "NewTaskShowFlag",
  initialState: NewTaskModalInitialState,
  reducers: {
    show(state) {
      state.ShowNewTaskModal = true;
    },
    hide(state) {
      state.ShowNewTaskModal = false;
    },
  },
});

export const NewTaskModalActions = NewTaskModalSlice.actions;

export default NewTaskModalSlice.reducer;
