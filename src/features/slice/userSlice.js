import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name : 'user',
    initialState : { user : null , isAuthenticated : false},
    reducers : {
        logIn : (state,action) => {

            return {user :action.payload , isAuthenticated : true}
        },
        logOut : (state,action) => {
            return {  user : null , isAuthenticated : false }
        }
    }
})

export const {logIn,logOut} = userSlice.actions
export const userReducer = userSlice.reducer