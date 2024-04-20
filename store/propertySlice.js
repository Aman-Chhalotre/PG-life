import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: null,
    propertyId: null,
    propertiesImages: null
}

const property = createSlice({
    name: "property",
    initialState,
    reducers: {
        getProperties: (state, action) => {
            state.properties = action.payload
            state.propertyId = action.payload
            // console.log(state.properties)
        },
        getPropertyId: (state, action) => {
            state.propertyId = action.payload.id
        },
        getPropertiesImages: (state, action) => {
            state.propertiesImages = action.payload.images
        },

    }
})

export const { getProperties, getPropertyId, getPropertiesImages } = property.actions;

export default property.reducer;