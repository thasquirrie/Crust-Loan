import { createSlice } from "@reduxjs/toolkit";

const posSlice = createSlice({
    name: "pos",
    initialState: {
        posRequests: null,
    },
    reducers: {
        setAllPosRequests: (state, action) => {
            state.posRequests = action.payload.data;
        },
    },
    extraReducers: (builder) => {},
});

export const { setAllPosRequests } = posSlice.actions;

export default posSlice.reducer;
