import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: true,
        accessToken: null
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
            state.isLoading = false
        },
        setAccessToken: (state, { payload }) => {
            state.accessToken = payload;
        }
    }
})


export const { setUser, setAccessToken } = authSlice.actions;

export default authSlice.reducer