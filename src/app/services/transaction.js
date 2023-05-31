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
        getAllNIPTransactions: builder.query({
            query: (params) => ({
                url: "/transaction/nip/credit",
                params,
            }),
        }),
        downloadTransactionRecords: builder.query({
            query: (params) => ({
                url: "/transaction/records/download",
                params,
            }),
        }),
        downloadTransaction: builder.query({
            query: (id) => ({
                url: `/transaction/detail/pdf/${id}`,
            }),
        }),
        reverseTransaction: builder.mutation({
            query: (id) => ({
                url: `/transaction/reverse`,
                method: "POST",
                body: { transactionId: id },
            }),
        }),
        retryNIPTransaction: builder.mutation({
            query: (id) => ({
                url: `/transaction/nip/fund-transfer-credit/retry/${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetAllTransactionServicesQuery,
    useGetAllNIPTransactionsQuery,
    useLazyGetAllNIPTransactionsQuery,
    useGetAllTransactionsQuery,
    useDownloadTransactionQuery,
    useReverseTransactionMutation,
    useRetryNIPTransactionMutation,
    useLazyGetAllTransactionsQuery,
    useLazyGetAllTransactionServicesQuery,
    useLazyDownloadTransactionRecordsQuery,
} = transactionApi;
