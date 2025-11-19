import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GateState {
  counter: number;
}

const initialState: GateState = {
  counter: 0,
};

export const gateSlice = createSlice({
  name: "gate",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    setCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
  },
});

export const { increment, setCounter } = gateSlice.actions;
export default gateSlice.reducer;
