import { createSlice } from "@reduxjs/toolkit";

const DeleteSingleTaskModalInitialState = {
  ShowModal: false,
  DeletingTask: {},
};

const DeleteSingleTaskModalSlice = createSlice({
  name: "DeleteTaskSingle",
  initialState: DeleteSingleTaskModalInitialState,
  reducers: {
    ShowModal(state, action) {
      state.ShowModal = true;
      state.DeletingTask = { ...action.payload };
    },
    HideModal(state) {
      state.ShowModal = false;
      state.DeletingTask = {};
    },
  },
});

export const DeleteSingleTaskActions = DeleteSingleTaskModalSlice.actions;

export default DeleteSingleTaskModalSlice.reducer;
