import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed(state, action){
            return action.payload
        },  
        removeFeed(state,action){
            const newState = state.filter((user)=>user._id !== action.payload )
            return newState
        } ,
        clearFeed(){
            return null
        }
    }
})

export const {addFeed, removeFeed, clearFeed} = feedSlice.actions
export default feedSlice.reducer
  