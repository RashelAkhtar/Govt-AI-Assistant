import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = process.env.NEXT_PUBLIC_API_URL;

export const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api}/document`,
        credentials: 'include',

    }),
    endpoints: (builder) => ({
        uploadDocument: builder.mutation({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data,
            })
        }),
    })
})

export const { useUploadDocumentMutation } = documentApi;