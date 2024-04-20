import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        getUserData:(state, action)=>{
            state.status = true;
            state.userData = action.payload.userData
            // console.log(state.status)
        },
        login: (state)=> {
            state.status = true;
            state.userData = null
            
        },
        logout: (state)=>{
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout, getUserData} = authSlice.actions;

export default authSlice.reducer;