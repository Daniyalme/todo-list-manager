import { configureStore } from "@reduxjs/toolkit";

import AllTaskReducer from "../store/AllTaskSlice";
import NewTaskModalReducer from "../store/NewTaskModalSlice";
import EditTaskModalReducer from "../store/EditTaskModalSlice";

export const store = configureStore({
  reducer: {
    tasks: AllTaskReducer,
    newtaskmodal: NewTaskModalReducer,
    edittaskmodal: EditTaskModalReducer,
  },
});
