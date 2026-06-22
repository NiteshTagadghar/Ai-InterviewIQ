import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice.js'
import usersReducer from './features/users/userSlice.js'


const store = configureStore({
    reducer : {
        counter : counterReducer,
        users : usersReducer
    }
})

export default store