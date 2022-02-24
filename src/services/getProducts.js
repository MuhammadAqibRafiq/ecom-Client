import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getProducts = createApi({

    reducerPath: 'getProducts',

    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),

    endpoints: (builder) => ({

        getProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET'
            })
        }),

        getProductsById: builder.query({
            query: (id) => {
                console.log("ID:", id)
                return {
                    url: `/products/${id}`,
                    method: 'GET'
                }
            }
        }),

    }),



})

export const { useGetProductsQuery, useGetProductsByIdQuery } = getProducts