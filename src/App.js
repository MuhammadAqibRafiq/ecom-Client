import React from 'react';
import './App.css';
// import { useGetProductsQuery,useGetProductsByIdQuery } from './services/getProducts'
import Navbar from './component/Navbar/Navbar'
import HomePage from './component/HomePage/HomePage'
import ProductInfo from './component/Products/Productinfo'

import CartScreen from './component/Cart/CartScreen'
import ShippingScreen from './component/Cart/ShippingScreen'
import PaymentScreen from './component/Cart/PaymentMethodScreen'
import PlaceOrderScreen from './component/Cart/PlaceOrderScreen'
import OrderDetailScreen from './component/Cart/OrderDetailScreen'

import Login from './component/Login/Login'
import Signup from './component/SignUp/SignUp'
import Profile from './component/Profile/Profile'

import { Routes, Route } from "react-router-dom";

function App() {

  // const res = useGetProductsQuery()
  // const {data,isLoading,error} = useGetProductsByIdQuery("61c439199184bda85ce13c3a")
  // console.log(data)
  // console.log(res)

  return (
    <div className="App pb-4"  >
      
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        {/* <Route exact path="/cart/:id" element={<CartScreen />} /> */}
        <Route exact path="/cart" element={<CartScreen />} />
        <Route exact path="/shipping" element={<ShippingScreen />} />
        <Route exact path="/payment" element={<PaymentScreen />} />
        <Route exact path="/placeorder" element={<PlaceOrderScreen />} />
        <Route exact path="/orders/:id" element={<OrderDetailScreen />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/profile" element={<Profile />} />

      </Routes>


    </div>
  );
}

export default App;
