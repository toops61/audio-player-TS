import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface paramsType {
    duration?: number;
    actualTime?: number;
}

const initialState = {
    duration: 0,
    actualTime: 0
}

const generalParamsSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        updateTime: (state,action: PayloadAction<paramsType>) => ({...state,...action.payload})
    }
})

export const {updateTime} = generalParamsSlice.actions;

export default generalParamsSlice.reducer;