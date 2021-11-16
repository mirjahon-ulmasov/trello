import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    users: ['Mirjahon', 'Jamshid', 'Bekzod', 'Ali'],
    headers: [
      { title: 'Нужно сделать', status: 'todo' },
      { title: 'В процессе', status: 'inProgress' },
      { title: 'Готово', status: 'done' },
    ],
    currentUser: 'ALL',
  },
  reducers: {
    changeUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const dataAction = dataSlice.actions;
export default dataSlice.reducer;
