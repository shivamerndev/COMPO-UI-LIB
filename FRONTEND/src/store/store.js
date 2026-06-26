import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth.slice"
import componentSlice from "../features/code/component.slice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        component: componentSlice,
    }
})