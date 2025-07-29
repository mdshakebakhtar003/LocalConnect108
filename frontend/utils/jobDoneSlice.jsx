import { createSlice } from '@reduxjs/toolkit';

const jobDoneSlice = createSlice({
  name: 'jobDone',
  initialState: {},
  reducers: {
    setJobDone: (state, action) => {
      const { bookingId } = action.payload;
      state[bookingId] = true;
    },
  },
});

export const { setJobDone } = jobDoneSlice.actions;
export default jobDoneSlice.reducer;