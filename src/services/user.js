import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const user = createApi({

    reducerPath: 'user',

    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),

    endpoints: (builder) => ({

        Login: builder.mutation({
            query: (body) => {
            //  console.log("Create body: ", body)
             return {
              url: `/users/login`,
              method: 'POST',
              body: body,
              headers: {
               'Content-type': 'application/json; charset=UTF-8',
              }
             }
            }
           }),

           Register: builder.mutation({
            query: (body) => {
            //  console.log("Create body: ", body)
             return {
              url: `/users`,
              method: 'POST',
              body: body,
              headers: {
               'Content-type': 'application/json; charset=UTF-8',
              }
             }
            }
           }),

           updateRegister: builder.mutation({
            query: (body) => {
             console.log("Create body: ", body)
             return {
              url: `/users/profile`,
              method: 'PUT',
              body: body,
              headers: {
               'Content-type': 'application/json; charset=UTF-8',
               Authorization : `bearer ${body.token}`
              }
             }
            }
           }),

    }),

})

export const {  useLoginMutation, useRegisterMutation , useUpdateRegisterMutation } = user