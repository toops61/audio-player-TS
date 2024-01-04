import { configureStore } from "@reduxjs/toolkit";
import generalParamsSlice from "./generalParamsSlice";
import songsSlice from "./songsSlice";
import timeSlice from "./timeSlice";
import coversSlice from "./coversSlice";
//import logger from "redux-logger";

const store = configureStore({
    reducer: {
        generalParamsSlice,
        songsSlice,
        timeSlice,
        coversSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;