import { createSlice } from "@reduxjs/toolkit";

const posSlice = createSlice({
    name: "pos",
    initialState: {
        posRequests: null,
        getAggregator: null,
        getPos: null,
        aggregatorPosDevices: null,
        aggregatorAgents: null,
        aggregatorTransactionCount: null,
        getAgentByAccountNumber: null,
        aggregatorPosDevices: null,
        aggregatorAgents: null,
        aggregatorTransactionCount: null,
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
        setAggregatorPos: (state, action) => {
            state.aggregatorPosDevices = action.payload.data;
        },
        resetAggregatorPos: (state, action) => {
            state.aggregatorPosDevices = null;
        },
        setAggregatorAgents: (state, action) => {
            state.aggregatorAgents = action.payload.data;
        },
        resetAggregatorAgents: (state, action) => {
            state.aggregatorAgents = null;
        },
        setAggregatorTransactionCount: (state, action) => {
            state.aggregatorTransactionCount = action.payload.data;
        },
        resetAggregatorTransactionCount: (state, action) => {
            state.aggregatorTransactionCount = null;
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
    setAggregatorPos,
    setAggregatorTransactionCount,
    resetAggregatorTransactionCount,
    resetAggregatorPos,
    resetAggregatorAgents,
    setAggregatorAgents,
    setGetAggregator,
    resetGetAggregator,
    setGetPos,
    resetGetPos,
    setGetAgentByAccountNumber,
    resetGetAgentByAccountNumber,
} = posSlice.actions;

export default posSlice.reducer;
