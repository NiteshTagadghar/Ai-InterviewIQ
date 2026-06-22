import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count : 0,
    total : 1000
}

const counterSlice = createSlice({
    name : "counter",
    initialState ,

    // actions = {increment,decrement}

    reducers :{
        
        increment(state){
            state.count++ // behind the scene return {...state, count : state.count + 1}
        },

        decrement(state){
            state.count--
        },

        customTwenty(state,action){
            console.log(action,'action object')
            state.count += action.payload
        },

        reset(state){
            state.count = 0
        }
    }


})

console.log(counterSlice,'counter slice')
export const {increment,decrement,customTwenty,reset} = counterSlice.actions
export default counterSlice.reducer