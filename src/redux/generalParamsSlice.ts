import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface paramsType {
    isLoading?: boolean;
    playedArray?: number[];
    playing?: boolean;
    random?: boolean;
    repeat?: ''|'ONE'|'ALL';
    songPlaying?: number;
    volume?:number;
}

const initialState = {
    isLoading: false,
    playedArray: [] as number[],
    playing: false,
    random:false,
    repeat:'' as ''|'ONE'|'ALL',
    songPlaying: 1,
    volume:.1
}

const generalParamsSlice = createSlice({
    name: "generalParams",
    initialState,
    reducers: {
        updateGeneralParams: (state,action: PayloadAction<paramsType>) => ({...state,...action.payload})
    }
})

export const {updateGeneralParams} = generalParamsSlice.actions;

export default generalParamsSlice.reducer;