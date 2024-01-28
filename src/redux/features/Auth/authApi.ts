import baseApi from "../../api/baseApi";

export interface ILoginCredentials {
  email: string;
  password: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILoginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
