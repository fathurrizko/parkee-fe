import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PosConfig, VehicleType, Member } from "../../types";
interface GateState {
  member: Member
  posConfig: PosConfig;
  vehicleType: VehicleType[];

  savingTicket: boolean;
  checkingClockIn: boolean;
  downloadingMember: boolean;
  downloadingVehicleType: boolean;
  downloadingPosConfig: boolean;
}

const initialState: GateState = {
  member: {} as Member,
  posConfig: {} as PosConfig,
  vehicleType: [],

  savingTicket: false,
  checkingClockIn: false,
  downloadingMember: false,
  downloadingPosConfig: false,
  downloadingVehicleType: false
};

export const gateSlice = createSlice({
  name: 'gate',
  initialState,
  reducers: {
    setVehicleType: (state, action: PayloadAction<VehicleType[]>) => {
      state.vehicleType = action.payload;
    },
    setPosConfig: (state, action: PayloadAction<PosConfig>) => {
      state.posConfig = action.payload;
    },
    setMember: (state, action: PayloadAction<Member>) => {
      state.member = action.payload;
    },
    clearMember: (state) => {
      state.member = {} as Member;
    },

    setSavingTicket: (state, action: PayloadAction<boolean>) => {
      state.savingTicket = action.payload;
    },
    setCheckingClockIn: (state, action: PayloadAction<boolean>) => {
      state.checkingClockIn = action.payload;
    },
    setDownloadingMember: (state, action: PayloadAction<boolean>) => {
      state.downloadingMember = action.payload;
    },
    setDownloadingVehicleType: (state, action: PayloadAction<boolean>) => {
      state.downloadingVehicleType = action.payload;
    },
    setDownloadingPosConfig: (state, action: PayloadAction<boolean>) => {
      state.downloadingPosConfig = action.payload;
    },
  }
});

export const { 
  setVehicleType, setDownloadingVehicleType, setPosConfig, setDownloadingPosConfig, 
  setDownloadingMember, setMember, clearMember, setCheckingClockIn, setSavingTicket
 } = gateSlice.actions;
export default gateSlice.reducer;
