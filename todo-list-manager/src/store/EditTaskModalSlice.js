import { createSlice } from "@reduxjs/toolkit";

const EditTaskModalInitialState = { ShowEditTaskModal: false, EditingTask: {} };

const EditTaskModalSlice = createSlice({
  name: "EditTaskShowFlag",
  initialState: EditTaskModalInitialState,
  reducers: {
    show(state, action) {
      state.ShowEditTaskModal = true;
      state.EditingTask = { ...action.payload };
    },
    hide(state) {
      state.ShowEditTaskModal = false;
      state.EditingTask = {};
    },
  },
});

export const EditTaskModalActions = EditTaskModalSlice.actions;

export default EditTaskModalSlice.reducer;
