import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // cartItems: [],
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    // cartTotalQuantity: 0,
    // cartTotalAmount: 0,
    shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},

    paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : {},

}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart(state, action) {

            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
            console.log()

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].qty += 1
            } else {
                const { _id, name, image, price, countinStock } = action.payload
                const tem = { _id, name, image, price, countinStock }
                const temPro = { ...tem, qty: 1 }

                // const temPro = { ...action.payload, qty: 1 }
                state.cartItems.push(temPro)
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },

        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
            state.cartItems = nextCartItems
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeAll(state, action) {
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decreaseFromQty(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

            if (state.cartItems[itemIndex].qty > 1) {
                state.cartItems[itemIndex].qty -= 1
            } else if (state.cartItems[itemIndex].qty === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
                state.cartItems = nextCartItems
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        increaseFromQty(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

            if (state.cartItems[itemIndex].qty >= 1) {
                if (state.cartItems[itemIndex].qty === state.cartItems[itemIndex].countinStock) {
                    alert("exceed stock limit")
                } else {
                    state.cartItems[itemIndex].qty += 1
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
        },




    },

})

export default cartSlice.reducer

export const { addToCart, removeFromCart, removeAll, decreaseFromQty, increaseFromQty, saveShippingAddress , savePaymentMethod } = cartSlice.actions