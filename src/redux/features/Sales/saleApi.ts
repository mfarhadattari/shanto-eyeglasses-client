import baseApi from "../../api/baseApi";

interface ISale {
  product: string;
  buyerName: string;
  quantity: number;
}

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSale: builder.mutation({
      query: (data: ISale) => ({
        url: "/sales",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Eyeglasses"],
    }),
  }),
});

export const { useAddSaleMutation } = saleApi;
