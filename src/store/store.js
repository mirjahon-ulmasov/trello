import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task-slice';
import dataReducer from './data-slice';

const store = configureStore({
  reducer: {
    task: taskReducer,
    data: dataReducer,
  },
});

export default store;
