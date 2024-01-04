import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface coverType {
    album: string;
    cover: string;
}

const initialState : coverType[] = [];

const coversSlice = createSlice({
    name: "covers",
    initialState,
    reducers: {
        updateCoversArray: (state,action: PayloadAction<coverType>) => {
            return [...state,action.payload];
        }
    }
})

export const { updateCoversArray } = coversSlice.actions;

export default coversSlice.reducer;