import { createSlice } from "@reduxjs/toolkit";

const loanSlice = createSlice({
    name: "loan",
    initialState: {
        loans: null,
    },
    reducers: {
        setAllLoans: (state, action) => {
            state.loans = action.payload.data;
        },
    },
    extraReducers: (builder) => {},
});

export const { setAllLoans } = loanSlice.actions;

export default loanSlice.reducer;
