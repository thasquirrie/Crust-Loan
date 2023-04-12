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
                params,
            }),
        }),
        getAggregator: builder.query({
            query: (params) => ({
                url: "/user/admin/aggregators",
                params,
            }),
        }),
        getPos: builder.query({
            query: (params) => ({
                url: "/transaction/pos",
                params,
            }),
        }),
        approvePosRequest: builder.mutation({
            query: (body) => ({
                url: "transaction/pos/requests/approve",
                method: "POST",
                body,
            }),
        }),
        declinePosRequest: builder.mutation({
            query: (body) => ({
                url: "transaction/pos/requests/decline",
                method: "POST",
                body,
            }),
        }),
        mapPosToAggregators: builder.mutation({
            query: (body) => ({
                url: "/transaction/pos/requests/assign",
                method: "POST",
                body,
            }),
        }),
        assignPosToAgent: builder.mutation({
            query: (body) => ({
                url: "/transaction/pos/agent/assign",
                method: "POST",
                body,
            }),
        }),
        assignPosDevicesToAggregator: builder.mutation({
            query: (body) => ({
                url: "/transaction/pos/aggregatort/assign",
                method: "POST",
                body,
            }),
        }),
        getAllPosActivity: builder.query({
            query: (params) => ({
                url: "/transaction/pos/transactions/activity",
                params,
            }),
        }),
    }),
});

export const {
    useGetAllPosRequestsQuery,
    useLazyDownloadPosTransactionQuery,
    useGetAllPosTransactionsQuery,
    useLazyGetAllPosTransactionsQuery,
    useLazyGetAllPosRequestsQuery,
    useLazyGetAggregatorQuery,
    useLazyGetPosQuery,
    useAssignPosDevicesToAggregatorMutation,
    useGetPosQuery,
    useApprovePosRequestMutation,
    useDeclinePosRequestMutation,
    useMapPosToAggregatorsMutation,
    useAssignPosToAgentMutation,
    useGetAllPosActivityQuery,
    useLazyGetAllPosActivityQuery,
} = posApi;
