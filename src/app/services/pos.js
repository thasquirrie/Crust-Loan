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
        getAgent: builder.query({
            query: (accountNumber) => ({
                url: `/transaction/pos/agent/${accountNumber}`,
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
                url: "/transaction/pos/aggregator/assign",
                method: "POST",
                body,
            }),
        }),
        getAllPosActivity: builder.query({
            query: (params) => ({
                url: "/transaction/pos/activity",
                params,
            }),
        }),
        createAggregator: builder.mutation({
            query: (agentId) => ({
                url: `/user/admin/agent/upgrade/${agentId}`,
                method: "POST",
            }),
        }),
        getAggregatorPosDevices: builder.query({
            query: (aggregatorId) => ({
                url: `/transaction/pos/aggregators/${aggregatorId}/pos-devices`,
            }),
        }),
        getAggregatorAgent: builder.query({
            query: (aggregatorId) => ({
                url: `/user/admin/aggregators/${aggregatorId}/agents`,
            }),
        }),
        getAggregatorTransaction: builder.query({
            query: (aggregatorId) => ({
                url: `/transaction/pos/aggregators/${aggregatorId}/transaction-count`,
            }),
        }),
        downloadPosActivityRecords: builder.query({
            query: (params) => ({
                url: `/transaction/pos/activity/download`,
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
    useGetAggregatorQuery,
    useApprovePosRequestMutation,
    useDeclinePosRequestMutation,
    useMapPosToAggregatorsMutation,
    useAssignPosToAgentMutation,
    useGetAllPosActivityQuery,
    useLazyGetAllPosActivityQuery,
    useGetPosHistoryQuery,
    useGetAllMerchantsQuery,
    useCreatePosMutation,
    useLazyGetAgentByAccountNumberQuery,
    useGetPosCategoryQuery,
    useReassignPosMutation,
    useLazyGetAgentQuery,
    useCreateAggregatorMutation,
    useGetAggregatorAgentQuery,
    useGetAggregatorTransactionQuery,
    useGetAggregatorPosDevicesQuery,
    useLazyDownloadPosActivityRecordsQuery,
} = posApi;
