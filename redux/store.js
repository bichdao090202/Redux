import { combineReducers, configureStore } from "@reduxjs/toolkit"
import reducer from "./reducer"

export const store = configureStore({
    reducer:combineReducers({
        todo:reducer
    }),
    devTools:"todo"
})