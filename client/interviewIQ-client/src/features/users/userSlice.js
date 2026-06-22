import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


/*
    users/fetchUsers/pending
    users/fetchUsers/fullfilled
    users/fetchUsers/rejected

*/



export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {

    try {

        console.log("calling async thunk")

        const result = await axios.get(`https://dummyjson.com/users`)

        return result.data.users

    } catch (err) {
        return "Failed to load users"
    }

})

// {type : users/fetchUsers/pending}
// {type : users/fetchUsers/fulfilled, paylaod : [{}]}
// {type : users/fetchUsers/rejected, paylaod : "Failded to load useres"}




const initialState = {
    isLoading : false,
    users : [],
    err : null
}

const userSlice = createSlice({
    name : "user",
    initialState,

    reducers :{},



    // builder is an object created from asyncThunk 
    extraReducers : (builder)=>{
        builder

        // Pending case executes immediately once dispatch is triggered
        .addCase(fetchUsers.pending, (state)=>{
            state.isLoading = true
        })

        // Fullfilled case
        .addCase(fetchUsers.fulfilled, (state,action)=>{
            state.isLoading = false

            state.users = action.payload
        })

        // Rejected case
        .addCase(fetchUsers.rejected , (state,action)=>{
            state.isLoading = false
            state.err = action.payload
        })


    }
})


export default userSlice.reducer