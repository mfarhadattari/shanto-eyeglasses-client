import baseApi from "../../api/baseApi";

const eyeglassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEyeglasses: builder.query({
      query: () => ({
        url: "/eyeglasses",
        method: "GET",
      }),
    }),
    getEyeglassDetails: builder.query({
      query: (id) => ({
        url: `/eyeglasses/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEyeglassDetailsQuery, useGetEyeglassesQuery } =
  eyeglassApi;
