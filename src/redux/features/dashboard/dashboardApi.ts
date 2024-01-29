import baseApi from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
