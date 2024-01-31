import { Key } from "react";
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
    searchEyeglass: builder.mutation({
      query: (searchTerm: string) => ({
        url: `/eyeglasses?searchTerm=${searchTerm}`,
        method: "GET",
      }),
      invalidatesTags: ["Eyeglasses"],
    }),
    filterEyeglass: builder.mutation({
      query: (queryString: string) => ({
        url: `/eyeglasses?${queryString}`,
        method: "GET",
      }),
      invalidatesTags: ["Eyeglasses"],
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
      invalidatesTags: ["Eyeglasses", "SingleEyeglass"],
    }),
    bulkDeleteEyeglasses: builder.mutation({
      query: (ids: Key[]) => ({
        url: `/eyeglasses/bulk-delete`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Eyeglasses", "SingleEyeglass"],
    }),
    addEyeglass: builder.mutation({
      query: (data: FormData) => ({
        url: `/eyeglasses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Eyeglasses", "SingleEyeglass"],
    }),
    updateEyeglass: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, unknown> }) => ({
        url: `/eyeglasses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Eyeglasses", "SingleEyeglass"],
    }),
  }),
});

export const {
  useGetEyeglassDetailsQuery,
  useGetEyeglassesQuery,
  useDeleteEyeglassMutation,
  useBulkDeleteEyeglassesMutation,
  useAddEyeglassMutation,
  useUpdateEyeglassMutation,
  useSearchEyeglassMutation,
  useFilterEyeglassMutation,
} = eyeglassApi;
