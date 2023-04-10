import { baseApi } from "./api";

export const agentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAgents: builder.query({
            query: (params) => ({
                url: "/user/admin/agents",
                params,
            }),
        }),
        lockAgent: builder.mutation({
            query: (userId) => ({
                url: `/user/lock/${userId}`,
                method: "POST",
            }),
        }),
        unlockAgent: builder.mutation({
            query: (userId) => ({
                url: `/user/unlock/${userId}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useLockAgentMutation,
    useUnlockAgentMutation,
    useGetAllAgentsQuery,
    useLazyGetAllAgentsQuery,
} = agentApi;
