import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import cartReducer from '../features/cartSlice'
import userReducer from '../features/userSlice'
import orderReducer from '../features/orderSlice'

import { getProducts } from '../services/getProducts'
import { user } from '../services/user'
import { order } from '../services/order'


export const store = configureStore({

  reducer: {
    cart: cartReducer,
    userInfo: userReducer,
    orderInfo: orderReducer,


    [getProducts.reducerPath]: getProducts.reducer,
    [user.reducerPath]: user.reducer,
    [order.reducerPath]: order.reducer,
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getProducts.middleware),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(user.middleware),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(order.middleware),

})


setupListeners(store.dispatch)