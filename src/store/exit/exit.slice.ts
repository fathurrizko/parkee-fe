import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { Member, PaymentMethod, PosConfig } from "../../types";

interface ExitState {
  member: Member,
  posConfig: PosConfig;
  paymentMethod: PaymentMethod[],

  downloadingPaymentMethod: boolean,
  downloadingPosConfig: boolean,
  downloadingMember: boolean
}

const initialState: ExitState = {
  member: {} as Member,
  posConfig: {} as PosConfig,
  paymentMethod: [],

  downloadingPaymentMethod: false,
  downloadingPosConfig: false,
  downloadingMember: false,
}

export const exitSlice = createSlice({
  name: 'exit',
  initialState,
  reducers: {
    clearMember: (state) => {
      state.member = {} as Member;
    },
    setMember: (state, action: PayloadAction<Member>) => {
      state.member = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod[]>) => {
      state.paymentMethod = action.payload;
    },
    setPosConfig: (state, action: PayloadAction<PosConfig>) => {
      state.posConfig = action.payload;
    },

    setDownloadingPaymentMethod: (state, action: PayloadAction<boolean>) => {
      state.downloadingPaymentMethod = action.payload;
    },
    setDownloadingPosConfig: (state, action: PayloadAction<boolean>) => {
      state.downloadingPosConfig = action.payload;
    },
    setDownloadingMember: (state, action: PayloadAction<boolean>) => {
      state.downloadingMember = action.payload;
    },
  }
})

export const {
  setMember, clearMember, setDownloadingPaymentMethod, setPaymentMethod,
  setPosConfig, setDownloadingPosConfig, setDownloadingMember
} = exitSlice.actions;
export default exitSlice.reducer;