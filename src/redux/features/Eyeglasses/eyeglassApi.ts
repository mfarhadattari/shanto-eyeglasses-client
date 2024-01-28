import baseApi from "../../api/baseApi";

const eyeglassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEyeglasses: builder.query({
      query: () => ({
        url: "/eyeglasses",
        method: "GET",
      }),
      providesTags: ["Eyeglasses"],
    }),
    getEyeglassDetails: builder.query({
      query: (id) => ({
        url: `/eyeglasses/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleEyeglass"],
    }),
  }),
});

export const { useGetEyeglassDetailsQuery, useGetEyeglassesQuery } =
  eyeglassApi;
