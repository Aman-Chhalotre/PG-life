import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js'
import propertyReducer from './propertySlice.js'
import interestedPropertyReducer from './interestedPropertiesSlice.js'


const store = configureStore({
    reducer: {
        authReducer,
        propertyReducer,
        interestedPropertyReducer,
    }

})

export default store;