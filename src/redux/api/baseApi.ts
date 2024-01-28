import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.SERVER_BASE_API}/api`,
  credentials: "include",
});

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export default baseApi;
