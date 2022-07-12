import { configureStore } from "@reduxjs/toolkit";
import tickersReducer from "./reducers/TickersSlice"

export const setupStore = () => {
    return configureStore({
        reducer: {
            tickersReducer,
        },
    })
}

