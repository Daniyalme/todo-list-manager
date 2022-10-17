import { createSlice } from "@reduxjs/toolkit";

const DeleteMultipleTaskModalInitialState = {
  ShowModal: false,
  DeletingTasks: [],
};

const DeleteMultipleTaskModalSlice = createSlice({
  name: "DeleteTaskMultiple",
  initialState: DeleteMultipleTaskModalInitialState,
  reducers: {
    ShowModal(state, action) {
      state.ShowModal = true;
    },
    HideModal(state) {
      state.ShowModal = false;
    },
    AddTask(state, action) {
      state.DeletingTasks = [...state.DeletingTasks, action.payload];
    },
    RemoveTask(state, action) {
      state.DeletingTasks = state.DeletingTasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    RemoveAllTask(state) {
      state.DeletingTasks = [];
    },
  },
});

export const DeleteMultipleTaskActions = DeleteMultipleTaskModalSlice.actions;

export default DeleteMultipleTaskModalSlice.reducer;
