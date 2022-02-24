import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOrderDetailMutation, useOrderDetailPayMutation } from '../../services/order'
import { orderDetail } from '../../features/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import PaypalButton from '../Shared/PaypalButton'


const OrderDetail = () => {

    const { id } = useParams()
    const [createPost, responseInfo] = useOrderDetailMutation()

    const [createPosts, responseInfos] = useOrderDetailPayMutation()


    const dispatch = useDispatch()

    const Data = useSelector(state => state.userInfo)
    const { token } = Data.userData

    const order = useSelector(state => state.orderInfo.orderDetail)
    // console.log(token)
    // console.log(id)

    useEffect(async () => {
        if (token && id) {
            const res = await createPost({ id, token })
            // console.log(res.data)
            if (res.data) {
                dispatch(orderDetail(res.data))
            } else (alert("Check order Detail screen"))
        }
    }, [token, dispatch, id, createPost])


    const handlePay = async () => {
        const res = await createPosts({ token, id })
        console.log(res)
        if (res.data) {
            dispatch(orderDetail(res.data))
        } else (alert("Check order Detail screen"))
        // navigate(`/orders/${data._id}`)

    }
    const handleSoon = () => {
        alert("Currently Not Availabe")
    }
    // console.log(token)
    return (
        <>
            <Container className="mt-4">
                {!order ? "CHECK YOUR CONNECTION OR REDO YOUR PAYMENT SORRY FOR THE INCONVENIEANCE"
                    :

                    <Row>
                        <Col md={8}>
                            <h3 style={{ background: '#dbdbdb' }} className='d-flex justify-content-center'>SHIPPING ADDRESS</h3>

                            <p><strong>Name : </strong> {order.user.name}</p>
                            <p><strong>Email : </strong> {order.user.email}</p>

                            <p><strong>ADDRESS : </strong>{order.shippingAddress.address} {order.shippingAddress.city} {order.shippingAddress.country} </p>
                            <p><strong>POSTAL CODE : </strong>{order.shippingAddress.postalCode} </p>
                            {
                                order.isDelevired ? <div style={{ background: 'green' }} className='mb-2 d-flex justify-content-center'>Delevired On : {order.deleviredAt.substring(0, 10)} </div>
                                    :
                                    <div style={{ background: '#f58080' }} className='mb-2 d-flex justify-content-center'>Not Delevired</div>
                            }

                            <h3 style={{ background: '#dbdbdb' }} className='d-flex justify-content-center'>PAYMENT METHOD</h3>

                            <p>{order.paymentMethod} </p>
                            {
                                order.isPaid ? <div style={{ background: '#87d973cf' }} className='mb-2 d-flex justify-content-center'> Payed On : {order.paidAt.substring(0, 10)}  </div>
                                    :
                                    <div style={{ background: '#f58080' }} className='mb-2 d-flex justify-content-center'>Not Paid</div>
                            }


                            <h3 style={{ background: '#dbdbdb' }} className='d-flex justify-content-center'>ORDER ITEMS</h3>

                            {order.orderItems.map((items, ind) => {
                                return <div className='d-flex m-4' key={ind}>
                                    <img src={items.image} width='10%' alt='' />
                                    <p className='p-3' style={{ marginLeft: "30px" }}>{items.name}</p>
                                    <p className='p-3' style={{ marginLeft: "30px" }}>{items.qty} X {items.price}$ = {items.qty * items.price}$</p>
                                    <p className='p-3' style={{ marginLeft: "30px" }}></p>
                                </div>
                            })}

                        </Col>

                        <Col md={4}>
                            <PaypalButton handlePay={handlePay} handleSoon={handleSoon} />
                        </Col>


                    </Row>
                }
                <hr />
            </Container>
        </>
    )
}

export default OrderDetail
