import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { songType } from "../utilsFuncs/interfaces";

const initialState : songType[] = [];

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        updateSongsArray: (_state,action: PayloadAction<songType[]>) => {
            return action.payload;
        }
    }
})

export const {updateSongsArray} = songsSlice.actions;

export default songsSlice.reducer;