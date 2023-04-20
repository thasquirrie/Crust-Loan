import { baseApi } from "./api";

export const loanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLoans: builder.query({
            query: (params) => ({
                url: "/loan/admin/view-loan-applications",
                params,
            }),
        }),
        getAllCluster: builder.query({
            query: (params) => ({
                url: "/loan/cluster",
                params,
            }),
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `/loan/user-details/${id}`,
            }),
        }),
        approveLoan: builder.mutation({
            query: (params) => ({
                url: `/loan/admin/approve/${params.id}`,
                method: "POST",
                body: {
                    offerAmount: params.appliedAmount,
                },
            }),
        }),
        disapproveLoan: builder.mutation({
            query: (body) => ({
                url: `/loan/admin/disapprove`,
                method: "POST",
                body,
            }),
        }),
        viewLoanHistory: builder.query({
            query: (id) => ({
                url: `/loan/view-loans/${id}`,
            }),
        }),
    }),
});

export const {
    useGetAllLoansQuery,
    useLazyGetAllLoansQuery,
    useGetAllClusterQuery,
    useGetUserDetailsQuery,
    useApproveLoanMutation,
    useDisapproveLoanMutation,
    useViewLoanHistoryQuery,
} = loanApi;
