import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { Member, PaymentMethod, PosConfig, Tariff } from "../../types";

interface ExitState {
  member: Member,
  posConfig: PosConfig;
  paymentMethod: PaymentMethod[],
  tariff: Tariff

  downloadingPaymentMethod: boolean,
  downloadingPosConfig: boolean,
  downloadingMember: boolean,
  checkingClockOutTariff: boolean,
  submitingClockOut: boolean,

  selectedVoucherCode: string,
  selectedVoucherAmount: number,
  selectedPaymentMethod: string
}

const initialState: ExitState = {
  member: {} as Member,
  tariff: {} as Tariff,
  posConfig: {} as PosConfig,
  paymentMethod: [],

  downloadingPaymentMethod: false,
  downloadingPosConfig: false,
  downloadingMember: false,
  checkingClockOutTariff: false,
  submitingClockOut: false,

  selectedVoucherCode: '',
  selectedVoucherAmount: 0,
  selectedPaymentMethod: ''
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
    setTariff: (state, action: PayloadAction<Tariff>) => {
      state.tariff = action.payload;
    },
    clearTariff: (state) => {
      state.tariff = {} as Tariff;
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
    setCheckingClockOutTariff: (state, action: PayloadAction<boolean>) => {
      state.checkingClockOutTariff = action.payload;
    },
    setSubmitingClokOut: (state, action: PayloadAction<boolean>) => {
      state.submitingClockOut = action.payload;
    },

    setSelectedVoucherCode: (state, action: PayloadAction<string>) => {
      state.selectedVoucherCode = action.payload;
    },
    setSelectedVoucherAmount: (state, action: PayloadAction<number>) => {
      state.selectedVoucherAmount = action.payload;
    },
    setSelectedPaymentMethod: (state, action: PayloadAction<string>) => {
      state.selectedPaymentMethod = action.payload;
    }
  }
})

export const {
  setMember, clearMember, setDownloadingPaymentMethod, setPaymentMethod,
  setPosConfig, setDownloadingPosConfig, setDownloadingMember,
  setTariff, clearTariff, setCheckingClockOutTariff, setSubmitingClokOut,
  setSelectedVoucherCode, setSelectedVoucherAmount, setSelectedPaymentMethod
} = exitSlice.actions;
export default exitSlice.reducer;