import { baseApi } from "./api";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactionServices: builder.query({
            query: () => "/transaction/service/all",
        }),
        getAllTransactions: builder.query({
            query: (params) => ({
                url: "/transaction/records",
                params,
            }),
        }),
        downloadTransactionRecords: builder.query({
            query: (params) => ({
                url: "/transaction/records/download",
                params,
            }),
        }),
        updateTransaction: builder.mutation({
            query: (body) => ({
                url: "transaction",
                method: "PUT",
                body,
            }),
        }),
    }),
});

export const {
    useGetAllTransactionServicesQuery,
    useGetAllTransactionsQuery,
    useLazyGetAllTransactionsQuery,
    useLazyGetAllTransactionServicesQuery,
    useUpdateTransactionMutation,
    useLazyDownloadTransactionRecordsQuery,
} = transactionApi;
