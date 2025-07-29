import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import jobDoneReducer from './jobDoneSlice';
const appStore = configureStore({
  reducer: {
    user: userReducer,
    jobDone: jobDoneReducer
    
  },
});

export default appStore;