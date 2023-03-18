import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        services: null,
    },
    reducers: {
        setTransactionServices: (state, action) => {
            state.services = action.payload.data;
        },
        setAllTransactions: (state, action) => {
            state.transactions = action.payload.data;
        },
    },
    extraReducers: (builder) => {},
});

export const { setTransactionServices, setAllTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
