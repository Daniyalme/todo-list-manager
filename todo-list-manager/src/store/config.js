import { configureStore } from "@reduxjs/toolkit";

import AllTaskReducer from "./AllTaskSlice";
import NewTaskModalReducer from "./NewTaskModalSlice";

export const store = configureStore({
  reducer: { tasks: AllTaskReducer, newtaskmodal: NewTaskModalReducer },
});
