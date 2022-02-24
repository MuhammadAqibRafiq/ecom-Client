import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderData: localStorage.getItem("orderData")
        ? JSON.parse(localStorage.getItem("orderData"))
        : null,
        orderDetail: localStorage.getItem("orderDetail")
        ? JSON.parse(localStorage.getItem("orderDetail"))
        : null
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderInfo: (state, action) => {
            state.orderData = action.payload;
            localStorage.setItem('orderData', JSON.stringify(state.orderData))
        },

        orderDetail: (state, action) => {
            state.orderDetail = action.payload;
            localStorage.setItem('orderDetail', JSON.stringify(state.orderDetail))
        },


    }
})

export default orderSlice.reducer

export const { orderInfo , orderDetail } = orderSlice.actions