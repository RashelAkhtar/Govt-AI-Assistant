import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aiApi = createApi({
    reducerPath: 'aiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/ai',
        credentials: 'include',

    }),
    endpoints: (builder) => ({
        aiChat: builder.mutation({
            query: (data) => ({
                url: "/chat",
                method: "POST",
                body: data,
            })
        }),
    })
})

export const { useAiChatMutation } = aiApi;