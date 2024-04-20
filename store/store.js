import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js'
import propertyReducer from './propertySlice.js'


const store = configureStore({
    reducer: {
        authReducer,
        propertyReducer
    }
    
})

export default store;