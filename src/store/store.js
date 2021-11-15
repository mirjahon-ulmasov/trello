import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task-slice";

const store = configureStore({
    reducer: {
        task: taskReducer
    }
}) 

export default store;