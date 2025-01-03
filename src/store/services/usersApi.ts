import { User } from "@/types/user";
import { BASE_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users.json",
    }),
    getUserById: builder.query<User, string>({
      query: () => "/users.json",
      transformResponse: (response: User[], _, id: string) => {
        return response.find((user) => user.id.toString() === id) as User;
      },
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation } =
  usersApi;
