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
    }),
});

export const {
    useGetAllTransactionServicesQuery,
    useGetAllTransactionsQuery,
    useDownloadTransactionQuery,
    useReverseTransactionMutation,
    useLazyGetAllTransactionsQuery,
    useLazyGetAllTransactionServicesQuery,
    useLazyDownloadTransactionRecordsQuery,
} = transactionApi;
