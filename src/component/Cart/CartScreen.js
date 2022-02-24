import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../../App.css'
import { removeFromCart, removeAll, decreaseFromQty, increaseFromQty } from '../../features/cartSlice'
import { Col, Row } from "react-bootstrap"
import CartTable from '../Shared/CartTable'
import { Button, IconButton, } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CartScreen = () => {
    // const { id, qty } = useParams()

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    console.log(cart)
    const navigate = useNavigate()

    const checkOut = () => {
        navigate('/shipping')
    }

    const handleRemoveAll = () => {
        dispatch(removeAll())
    }


    return (

        <>
            <Row className="m-4">
                {cart.cartItems.length === 0 ? (

                    <div className="d-flex align-items-center flex-column">

                        <h5>Your cart is currently empty</h5>

                        <div>
                            <img src="https://i.pinimg.com/236x/ab/d4/b3/abd4b33ac7ea8f812cd5ace983103f4c.jpg" width="100%" />
                        </div>

                        <Link to="/" className="d-flex align-items-center" style={{ textDecoration: 'none' }}>
                            <ArrowBackIcon />
                            <Button>Continue Shopping</Button>
                        </Link>

                    </div>

                )
                    :
                    (
                        <>
                            <Col md={8} >
                                <div className="d-flex justify-content-between">

                                    <Link to="/" className="d-flex align-items-center" style={{ textDecoration: 'none' }}>
                                        <ArrowBackIcon />
                                        <Button>Continue Shopping</Button>
                                    </Link>

                                    <IconButton onClick={() => handleRemoveAll()}>
                                        <DeleteForeverIcon />
                                        <Button>Delete all</Button>
                                    </IconButton>

                                </div>

                                <CartTable />


                            </Col>

                            <Col md={4} className="mt-4" style={{ background: "#8c868117", height: "250px" }}>
                                <h3>Order Summary</h3>

                                <div className="d-flex justify-content-between">
                                    <p>Subtotal ( {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)} items ) </p>
                                    <p>$ {cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} </p>
                                </div>

                                <div className="d-flex">
                                    <input style={{ width: "100%", height: "38px", border: "none", padding: "10px", }} placeholder="Enter Voucher Code" />
                                    <Button variant="contained" color="warning" style={{ marginLeft: "10px" }}>Apply</Button>
                                </div>

                                <div className='mt-2'>Total : $ {cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</div>


                                <div className="mt-4" >
                                    <Button variant="contained" style={{ width: '100%' }} onClick={checkOut}>Check Out</Button>
                                </div>

                            </Col>

                        </>)}

            </Row>

        </>


    )
}

export default CartScreen
