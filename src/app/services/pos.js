import { baseApi } from "./api";

export const posApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosRequests: builder.query({
            query: (params) => ({
                url: "/transaction/pos/requests",
                params,
            }),
        }),
    }),
});

export const { useGetAllPosRequestsQuery, useLazyGetAllPosRequestsQuery } = posApi;
