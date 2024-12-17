import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API = "http://localhost:8000/pastes";
export const pasteApi = createApi({
  reducerPath: "pasteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createPaste: builder.mutation({
      query: ({ title, content }) => ({
        url: "/",
        method: "POST",
        body: { title, content },
      }),
    }),
    updatePaste: builder.mutation({
      query: ({ pasteId, title, content }) => ({
        url: `/${pasteId}`,
        method: "PATCH",
        body: { title, content },
      }),
    }),
    getPaste: builder.query({
      query: ({ pasteId }) => ({
        url: `/${pasteId}`,
        method: "GET",
      }),
    }),
    deletePaste: builder.mutation({
      query: ({ pasteId }) => ({
        url: `/${pasteId}`,
        method: "DELETE",
      }),
    }),
    getAllPaste: builder.query({
      query: () => ({
        url: "/all-pastes",
      }),
    }),
    searchPaste : builder.query({
        query : () => {
            
            return {
                url : ''
            }
        }
    })
  }),
});

export const {
  useGetAllPasteQuery,
  useGetPasteQuery,
  useUpdatePasteMutation,
  useCreatePasteMutation,
  useDeletePasteMutation,
} = pasteApi;
