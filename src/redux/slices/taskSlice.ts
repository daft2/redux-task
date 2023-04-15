import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    removeOne: (state, action: PayloadAction<{ id: string }>) => {
      const targetId = action.payload.id;

      state.filter((tasks) => tasks.id !== targetId);
    },
    markCompleted: (state, action: PayloadAction<{ id: string }>) => {
      const targetId = action.payload.id;
      const taskIndex = state.findIndex((task) => task.id === targetId);

      if (taskIndex !== -1) {
        state.map((task) => {
          if (task.id === targetId) {
            task.completed = !task.completed;
          }
          return task;
        });
      }
    },
  },
});

export const { add, removeOne, markCompleted } = taskSlice.actions;

export default taskSlice.reducer;
