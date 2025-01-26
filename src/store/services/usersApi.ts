import { User } from "../../types/user";
import { BASE_URL } from "../../utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users.json",
      transformResponse: (response: User[]) => response,
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, string>({
      query: () => "/users.json",
      transformResponse: (response: User[], _, id: string) => {
        return response.find((user) => user.id.toString() === id) as User;
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    exportUsers: builder.mutation<
      Blob,
      { searchTerm: string; selectedCompany: string }
    >({
      query: (filters) => ({
        url: "export-users",
        method: "POST",
        body: {
          format: "csv",
          searchTerm: filters.searchTerm,
          selectedCompany: filters.selectedCompany,
        },
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useExportUsersMutation,
} = usersApi;
