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
    deleteEyeglass: builder.mutation({
      query: (id) => ({
        url: `/eyeglasses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Eyeglasses"],
    }),
    addEyeglass: builder.mutation({
      query: (data: FormData) => ({
        url: `/eyeglasses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Eyeglasses"],
    }),
  }),
});

export const {
  useGetEyeglassDetailsQuery,
  useGetEyeglassesQuery,
  useDeleteEyeglassMutation,
  useAddEyeglassMutation,
} = eyeglassApi;
