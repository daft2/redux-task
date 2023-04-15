import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
// creates a Redux store, and also automatically configure the Redux DevTools extension
// for inspectting the store while developing

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {task: Task}
export type AppDispatch = typeof store.dispatch;

export default store;
