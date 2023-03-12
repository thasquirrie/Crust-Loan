import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            console.log("action.payload", action.payload);
            const { user } = action.payload;
            state.user = user;
        },
        logOut: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            state.user = null;
        });
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
