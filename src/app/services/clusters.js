import { baseApi } from "./api";

export const clusterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClusters: builder.query({
            query: (params) => ({
                url: "/loan/cluster",
                params,
            }),
        }),
        getAllClusterRequests: builder.query({
            query: (params) => {
              console.log({params});
              return ({
                url: "/loan/cluster/request/all",
                params,
            })},
        }),
        approveClusterRequest: builder.mutation({
          query: (body) => ({
            url: '/loan/cluster/request/approve',
            method: 'POST',
            body
          })
        }),
        disapproveClusterRequest: builder.mutation({
          query: (body) => ({
            url: '/loan/cluster/request/disapprove',
            method: 'POST',
            body
          })
        })
    }),
});

export const {    
    useGetAllClustersQuery,
    useGetAllClusterRequestsQuery,
    useLazyGetAllClustersQuery,
    useLazyGetAllClusterRequestsQuery,
    useApproveClusterRequestMutation,
    useDisapproveClusterRequestMutation
} = clusterApi;
