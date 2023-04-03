import { baseApi } from "./api";

export const posApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosRequests: builder.query({
            query: (params) => ({
                url: "/transaction/pos/requests",
                params,
            }),
        }),
        getAllPosTransactions: builder.query({
            query: (params) => ({
                url: "/transaction/tms/transaction/view",
                params,
            }),
        }),
        downloadPosTransaction: builder.query({
            query: (params) => ({
                url: `/transaction/tms/transaction/download`,
                params
            }),
        }),
    }),
});

export const { useGetAllPosRequestsQuery, useLazyDownloadPosTransactionQuery, useGetAllPosTransactionsQuery,  useLazyGetAllPosTransactionsQuery, useLazyGetAllPosRequestsQuery } = posApi;
