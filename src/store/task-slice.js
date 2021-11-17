import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    todo: [],
    inProgress: [],
    done: [],
  },
  reducers: {
    removeFromTask(state, action) {
      const { type, index } = action.payload;
      state[type].splice(index, 1);
    },

    addToTask(state, action) {
      const { type, task, index } = action.payload;
      let existingTaskIndex;
      const existingTask = state[type].find((e, i) => {
        if (e.id === task.id) {
          existingTaskIndex = i;
          return true;
        } else {
          return false;
        }
      });
      if (!existingTask) {
        state[type].splice(index, 0, {
          id: task.id,
          title: task.title,
          users: task.users || [],
        });
      } else {
        state[type][existingTaskIndex] = {
          ...state[type][existingTaskIndex],
          users: task.users,
        };
      }
    },
    dragDropTask(state, action) {
      const { source, destination } = action.payload;
      const [removed] = state[source.droppableId].splice(source.index, 1);
      state[destination.droppableId].splice(destination.index, 0, {
        id: removed.id,
        title: removed.title,
        users: removed.users || [],
      });
    },
  },
});

export const taskAction = taskSlice.actions;
export default taskSlice.reducer;
