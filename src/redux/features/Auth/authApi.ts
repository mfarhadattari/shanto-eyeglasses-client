import baseApi from "../../api/baseApi";

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationCredentials {
  file: any;
  data: {
    name: string;
    email: string;
    password: string;
  };
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
    registration: builder.mutation({
      query: (data: FormData) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/my-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useGetProfileQuery } =
  authApi;
