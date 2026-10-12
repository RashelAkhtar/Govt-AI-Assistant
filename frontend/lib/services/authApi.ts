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

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:4000/api/v1/auth',
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