import { createSlice } from "@reduxjs/toolkit"

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state, action)=> action.payload,
        removeRequest: (state,action) => {
            const newArray = state.filter((request)=>request._id !== action.payload)
            return newArray
        },
        clearRequest: () => null,
    }
})
    
export const {addRequest, removeRequest, clearRequest} = requestSlice.actions;
export default requestSlice.reducer
