import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://677cc1214496848554c7848b.mockapi.io",
  }),
  endpoints: () => ({}),
  tagTypes: ["Cars", "Blogs", "Users"],
});
