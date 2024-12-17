import { combineReducers } from "@reduxjs/toolkit";
import { userReducer, userSlice } from "./slice/userSlice";
import { userApi } from "./apis/userApi";
import { pasteApi } from "./apis/pasteApi";

export const rootReducer = combineReducers({
    'user' : userReducer,
    [userApi.reducerPath] : userApi.reducer,
    [pasteApi.reducerPath] : pasteApi.reducer,
})