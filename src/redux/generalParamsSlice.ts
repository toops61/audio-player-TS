import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface paramsType {
    endSong?: boolean;
    isLoading?: boolean;
    loaded?: boolean;
    playedArray?: number[];
    playing?: boolean;
    random?: boolean;
    repeat?: ''|'ONE'|'ALL';
    songPlaying?: number;
    sortBy?: 'album'|'year';
    volume?:number;
}

const initialState = {
    endSong: false,
    isLoading: true,
    loaded: false,
    playedArray: [] as number[],
    playing: false,
    random:false,
    repeat:'' as ''|'ONE'|'ALL',
    songPlaying: 1,
    sortBy: 'album' as 'album'|'year',
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