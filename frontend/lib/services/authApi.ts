import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum UserRole {
    ADMIN = "Admin",
    EMPLOYEE = "Employee"
};

export type LoginUserDto = {
  email: string;
  password: string;
  role?: UserRole;
};

const api = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${api}/auth`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        loginEmployee: builder.mutation<any, LoginUserDto>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            })
        }),

        logout: builder.mutation<any, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            })
        })
    })
})

export const {useLoginEmployeeMutation, useLogoutMutation} = authApi;