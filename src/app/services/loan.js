import { baseApi } from "./api";

export const loanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLoans: builder.query({
            query: (params) => ({
                url: "loan/admin/view-loan-applications",
                params,
            }),
        }),
    }),
});

export const { useGetAllLoansQuery, useLazyGetAllLoansQuery } = loanApi;
