import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface paramsType {
    duration?: number;
    isLoading?: boolean;
    random?: boolean;
    repeat?: ''|'ONE'|'ALL';
}

const initialState = {
    duration: 0,
    isLoading: false,
    random:false,
    repeat:''
}

const generalParamsSlice = createSlice({
    name: "generalParams",
    initialState,
    reducers: {
        updateGeneralParams: (state,action: PayloadAction<paramsType>) => {
            state = {...state,...action.payload};
            return state;
        }
    }
})

export const {updateGeneralParams} = generalParamsSlice.actions;

export default generalParamsSlice.reducer;