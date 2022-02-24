import React, { useState } from 'react'
import { Card, Col, ListGroup, Row, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckOutStep from '../Shared/Breadcumb'
import { orderInfo } from '../../features/orderSlice'
import { usePlaceOrderMutation } from '../../services/order'


const PlaceOrderScreen = () => {

     const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createPost, responseInfo] = usePlaceOrderMutation()

    const Data = useSelector(state => state.userInfo)
    const { token, id } = Data.userData

    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress, paymentMethod } = cart

   


    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    const itemsPrice = addDecimal(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    const shippingPrice = addDecimal(itemsPrice > 500 ? 0 : 50)
    const taxPrice = addDecimal(Number((0.15 * itemsPrice).toFixed(2)))
    const totalPrice = addDecimal(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice))


    const handlePlaceorder = async () => {

        const res = await createPost({
            token,
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        })

        const { data } = res
        if (data) {
            dispatch(orderInfo({ data }))
            navigate(`/orders/${data._id}`)
        }
    }

    // console.log(cartItems)

    return (
        <>
            {/* <h1>Place Order</h1> */}
            <CheckOutStep step1 step2 step3 step4 />
            <Container>

                {!cart ? "CHECK YOUR CONNECTION OR REDO YOUR PAYMENT SORRY FOR THE INCONVENIEANCE"
                    :
                    <Row>
                        <Col md={8}>
                            <h3 style={{ background: "#f0f2f5" }} className='d-flex justify-content-center'>SHIPPING ADDRESS</h3>
                            <p className='m-4'>ADDRESS : {shippingAddress.address} {shippingAddress.city} {shippingAddress.country} </p>
                            <p className='m-4'>POSTAL CODE : {shippingAddress.postalCode} </p>


                            <h3 style={{ background: "#f0f2f5" }} className='d-flex justify-content-center'>PAYMENT METHOD</h3>
                            <p className='m-4'>{paymentMethod} </p>


                            <h3 style={{ background: "#f0f2f5" }} className='d-flex justify-content-center'>ORDER ITEMS</h3>
                            {cartItems.map((items, ind) => {
                                return <div className='d-flex m-4' key={ind}>
                                    <img src={items.image} width='10%' alt='' />
                                    <p className='p-3' style={{ marginLeft: "30px" }}>{items.name}</p>
                                    <p className='p-3' style={{ marginLeft: "30px" }}>{items.qty} X {items.price}$ = {items.qty * items.price}$</p>
                                    <p className='p-3' style={{ marginLeft: "30px" }}></p>
                                </div>
                            })}


                        </Col>


                        <Col md={4}>
                            <Card className='mb-5' >
                                <ListGroup >
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${itemsPrice}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${shippingPrice}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${taxPrice}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <Button className='primary' disabled={cartItems === 0} onClick={handlePlaceorder}>PLACE ORDER</Button>
                                </ListGroup>
                            </Card>


                        </Col>
                    </Row>
                }
                <hr />

            </Container>
        </>
    )
}

export default PlaceOrderScreen
