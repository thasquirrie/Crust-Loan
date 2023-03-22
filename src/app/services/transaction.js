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
    }),
});

export const {
    useGetAllTransactionServicesQuery,
    useGetAllTransactionsQuery,
    useDownloadTransactionQuery,
    useLazyGetAllTransactionsQuery,
    useLazyGetAllTransactionServicesQuery,
    useLazyDownloadTransactionRecordsQuery,
} = transactionApi;
