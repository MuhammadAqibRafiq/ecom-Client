import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const order = createApi({

    reducerPath: 'order',

    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),

    endpoints: (builder) => ({

        placeOrder: builder.mutation({
            query: (body) => {
                //  console.log("Create body: ", body)
                return {
                    url: `/orders`,
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        Authorization: `bearer ${body.token}`
                    }
                }
            }
        }),
        orderDetail: builder.mutation({
            query: (body) => {
                // console.log("Create body: ", body)
                return {
                    url: `/orders/${body.id}`,
                    method: 'POST',
                    body,
                    headers: {
                        // 'Content-type': 'application/json; charset=UTF-8',
                        Authorization: `bearer ${body.token}`
                    }
                }
            }
        }),

        orderDetailPay: builder.mutation({
            query: (body) => {
                // console.log("Create body: ", body)
                return {
                    url: `/orders/${body.id}/pay`,
                    method: 'PUT',
                    body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        Authorization: `bearer ${body.token}`
                    }
                }
            }
        }),

        myOrder: builder.query({
            query: (token) => {
                // console.log("Create body: ", token)
                return {
                    url: `/orders/myorders`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        Authorization: `bearer ${token}`
                    }
                }
            }
        }),

    }),

})

export const { usePlaceOrderMutation, useOrderDetailMutation, useOrderDetailPayMutation, useMyOrderQuery } = order