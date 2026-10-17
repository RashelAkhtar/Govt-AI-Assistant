import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = process.env.NEXT_PUBLIC_API_URL;

export const aiApi = createApi({
    reducerPath: 'aiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api}/ai`,
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