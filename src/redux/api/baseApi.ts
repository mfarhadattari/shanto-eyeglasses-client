import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import config from "../../config";
import { logout } from "../features/Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.SERVER_BASE_API}/api`,
  credentials: "include",
});

const eyeManBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const res = await fetch(
      `${config.SERVER_BASE_API}/api/auth/refresh-token`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.success) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: eyeManBaseQuery,
  tagTypes: ["Eyeglasses", "SingleEyeglass", "Sales", "SingleSale"],
  endpoints: () => ({}),
});

export default baseApi;
