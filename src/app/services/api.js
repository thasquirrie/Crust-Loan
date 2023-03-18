import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        const ttoken2 = getState().auth;
        console.log("token", ttoken2);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // // try to get a new token
        // const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
        // if (refreshResult.data) {
        //     // store the new token
        //     api.dispatch(setCredentials(refreshResult.data));
        //     // retry the initial query
        //     result = await baseQuery(args, api, extraOptions);
        // } else {
        api.dispatch(logOut());
        // }
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
