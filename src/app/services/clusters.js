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
                url: "/loan/cluster/request/all?page=0&size=3",
                params,
            })},
        }),
    }),
});

export const {    
    useGetAllClustersQuery,
    useGetAllClusterRequestsQuery,
    useLazyGetAllClustersQuery,
    useLazyGetAllClusterRequestsQuery
} = clusterApi;
