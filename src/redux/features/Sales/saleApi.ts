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
      invalidatesTags: ["Eyeglasses", "Sales", "dashboard"],
    }),
    getSales: builder.query({
      query: () => ({
        url: "/sales",
        method: "GET",
      }),
      providesTags: ["Sales"],
    }),
    getSaleDetails: builder.query({
      query: (id: string) => ({
        url: `/sales/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleSale"],
    }),
    filterSales: builder.mutation({
      query: (filter: string) => ({
        url: `/sales/?filter=${filter}`,
        method: "GET",
      }),
      invalidatesTags: ["Sales"],
    }),
  }),
});

export const {
  useAddSaleMutation,
  useGetSalesQuery,
  useGetSaleDetailsQuery,
  useFilterSalesMutation,
} = saleApi;
