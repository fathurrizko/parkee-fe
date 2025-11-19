import { configureStore } from "@reduxjs/toolkit";
import gateReducer from "./gate/gate.slice";

export const store = configureStore({
  reducer: {
    gate: gateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
