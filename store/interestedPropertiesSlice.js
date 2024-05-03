import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    InterestedProperties: null,
}

const interestedProperty = createSlice({
    name: "property",
    initialState,
    reducers: {
        getInterestedProperties: (state, action) => {
            state.InterestedProperties = action.payload
        }

    }
})

export const { getInterestedProperties } = interestedProperty.actions;

export default interestedProperty.reducer;