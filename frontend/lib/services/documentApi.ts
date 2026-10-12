import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/document',
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