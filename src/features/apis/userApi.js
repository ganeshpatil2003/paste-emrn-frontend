import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logIn, logOut } from "../slice/userSlice";
const API = "http://localhost:8000/user";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
  }),
  tagTypes : ['user'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ username, email, password }) => ({
        url: "/register",
        method: "POST",
        body: { username, email, password },
      }),
      
    }),
    logInUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags : ['user'],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const result = await queryFulfilled;
        console.log(result);
        dispatch(logIn(result.data.data.user));
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        await queryFulfilled;
        dispatch(logOut());
      },
      invalidatesTags : ['user']
    }),
    updateAvatar: builder.mutation({
      query: (formdata) => ({
        url: "/change-avatar",
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags : ['user']
    }),
    updateUser: builder.mutation({
      query: ({ username }) => ({
        url: "update",
        method: "PATCH",
        body: { username },
      }),
      invalidatesTags : ['user']
    }),
    changePassword: builder.mutation({
      query: ({ password }) => ({
        url: "/change-password",
        method: "PATCH",
        body: { password },
      }),
      invalidatesTags : ['user']
    }),
    getUser: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const result = await queryFulfilled;
        dispatch(logIn(result.data.data));
      },
      providesTags : ['user']
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogInUserMutation,
  useChangePasswordMutation,
  useLogOutMutation,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApi;
