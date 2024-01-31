import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import config from "../../config";
import {
  IAuthState,
  logout,
  refreshAuthToken,
} from "../features/Auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.SERVER_BASE_API}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const eyeManBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const res = await fetch(
        `${config.SERVER_BASE_API}/api/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: refreshToken,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        api.dispatch(refreshAuthToken(data.data as Partial<IAuthState>));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: eyeManBaseQuery,
  tagTypes: [
    "Eyeglasses",
    "SingleEyeglass",
    "Sales",
    "SingleSale",
    "dashboard",
    "profile",
  ],
  endpoints: () => ({}),
});

export default baseApi;
