import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    todo: [],
    inProgress: [],
    done: [],
  },
  reducers: {
    addToTask(state, action) {
      const { task, type } = action.payload;
      state[type].push({
        id: task.id,
        title: task.title,
        status:
          type === 'todo'
            ? 'Нужно сделать'
            : type === 'inProgress'
            ? 'В процессе'
            : 'Готово',
        users: [],
      });
    },
    
    removeFromTask(state, action) {
      const { id, type } = action.payload;
      state[type] = state[type].filter(e => {
        return e.id !== id;
      });
    },
  },
});

export const taskAction = taskSlice.actions;
export default taskSlice.reducer;
