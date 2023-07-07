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
                url: "/transaction/pos/requests/approve",
                method: "POST",
                body,
            }),
        }),
        unmapAgentPOS: builder.mutation({
            query: (body) => ({
                url: "/transaction/pos/agent/unmap",
                method: "POST",
                body,
            }),
        }),
        unmapAggregatorPOS: builder.mutation({
            query: (body) => ({
                url: "/transaction/pos/aggregator/unmap",
                method: "POST",
                body,
            }),
        }),
        declinePosRequest: builder.mutation({
            query: (id) => ({
                url: `/transaction/pos/reject/${id}`,
                method: "POST",
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
        getInactivePOSActivity: builder.query({
            query: (params) => ({
                url: "/transaction/pos/activity/inactive",
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
        downloadInactivePosActivityRecords: builder.query({
            query: (params) => ({
                url: `/transaction/pos/activity/inactive/download`,
                params,
            }),
        }),
        getPosHistory: builder.query({
            query: (id) => ({
                url: `/transaction/pos/pos-history/${id}`,
            }),
        }),
        getPosDetails: builder.query({
            query: (id) => ({
                url: `/transaction/pos?serialNumber=${id}`,
            }),
        }),
        getAllMerchants: builder.query({
            query: (id) => ({
                url: `/user/institutions/all`,
            }),
        }),
        createPos: builder.mutation({
            query: (body) => ({
                url: `/transaction/pos/create`,
                method: "POST",
                body,
            }),
        }),
        getAgentByAccountNumber: builder.query({
            query: (accountNumber) => ({
                url: `/transaction/pos/agent/${accountNumber}`,
            }),
        }),
        getPosCategory: builder.query({
            query: () => ({
                url: `/transaction/pos/category`,
            }),
        }),
        reassignPosToAgent: builder.mutation({
            query: (body) => ({
                url: `/transaction/pos/agent/reassign`,
                method: "POST",
                body,
            }),
        }),
        reassignPosToAggregator: builder.mutation({
            query: (body) => ({
                url: `/transaction/pos/aggregator/reassign`,
                method: "POST",
                body,
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
    useGetInactivePOSActivityQuery,
    useLazyGetInactivePOSActivityQuery,
    useGetPosHistoryQuery,
    useGetAllMerchantsQuery,
    useCreatePosMutation,
    useLazyGetAgentByAccountNumberQuery,
    useGetPosCategoryQuery,
    useReassignPosToAgentMutation,
    useReassignPosToAggregatorMutation,
    useUnmapAgentPOSMutation,
    useUnmapAggregatorPOSMutation,
    useLazyGetAgentQuery,
    useCreateAggregatorMutation,
    useGetAggregatorAgentQuery,
    useGetAggregatorTransactionQuery,
    useGetAggregatorPosDevicesQuery,
    useLazyDownloadPosActivityRecordsQuery,
    useLazyDownloadInactivePosActivityRecordsQuery,
    useGetPosDetailsQuery,
} = posApi;
