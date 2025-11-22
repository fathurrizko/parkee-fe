import { configureStore } from "@reduxjs/toolkit";
import gateReducer from "./gate/gate.slice";
import exitReducer from "./exit/exit.slice";

export const store = configureStore({
  reducer: {
    gate: gateReducer,
    exit: exitReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
