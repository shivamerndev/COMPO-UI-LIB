import { createSlice } from "@reduxjs/toolkit"

const componentSlice = createSlice({
    name: "compo",
    initialState: {
        code: "",
        currentComponent: null,
        components: [],
        chunking: false,
        generatedRes: null,
        webBuilder: false
    },
    reducers: {
        setChunking: (state) => {
            state.chunking = !state.chunking
        },
        setCode: (state, { payload }) => {
            state.code = payload
        },
        setComponents: (state, { payload }) => {
            state.components = payload
        },
        setCurrentComponent: (state, { payload }) => {
            state.currentComponent = payload
        },
        setWebBuilder: (state) => {
            state.webBuilder = !state.webBuilder
        },
        setGeneratedRes: (state, { payload }) => {
            state.generatedRes = payload
        }
    }
})

export const { setCode, setComponents, setCurrentComponent, setWebBuilder, setChunking, setGeneratedRes } = componentSlice.actions
export default componentSlice.reducer