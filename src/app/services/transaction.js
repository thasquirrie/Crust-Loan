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
        createTransaction: builder.mutation({
            query: (body) => ({
                url: "transaction",
                method: "POST",
                body,
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
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
} = transactionApi;
