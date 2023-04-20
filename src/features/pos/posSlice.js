import { createSlice } from "@reduxjs/toolkit";

const posSlice = createSlice({
    name: "pos",
    initialState: {
        posRequests: null,
        getAggregator: null,
        getPos: null,
        getAgentByAccountNumber: null,
    },
    reducers: {
        setAllPosRequests: (state, action) => {
            state.posRequests = action.payload.data;
        },
        setGetAggregator: (state, action) => {
            state.getAggregator = action.payload.data;
        },
        resetGetAggregator: (state) => {
            state.getAggregator = null;
        },
        setGetPos: (state, action) => {
            state.getPos = action.payload.data;
        },
        resetGetPos: (state) => {
            state.getPos = null;
        },
        setGetAgentByAccountNumber: (state, action) => {
            state.getAgentByAccountNumber = action.payload.data;
        },
        resetGetAgentByAccountNumber: (state) => {
            state.getAgentByAccountNumber = null;
        },
    },
    extraReducers: (builder) => {},
});

export const {
    setAllPosRequests,
    setGetAggregator,
    resetGetAggregator,
    setGetPos,
    resetGetPos,
    setGetAgentByAccountNumber,
    resetGetAgentByAccountNumber,
} = posSlice.actions;

export default posSlice.reducer;
