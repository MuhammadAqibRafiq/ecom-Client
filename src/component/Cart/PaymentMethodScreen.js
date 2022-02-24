import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutStep from '../Shared/Breadcumb'
import { savePaymentMethod } from '../../features/cartSlice'
import { useNavigate } from 'react-router-dom'
import { TextField, Card, Typography, IconButton, CardHeader, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaymentIcon from '@mui/icons-material/Payment';

const PaymentMethodScreen = () => {

    const [paymentMethod, setpaymentMethod] = useState('paypal')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const statepaymentMethod = useSelector(state => state.cart.paymentMethod)
    const Data = useSelector(state => state.userInfo)
    console.log(Data)
    console.log(paymentMethod)

    const handleSubmit = () => {
        if (!paymentMethod) {
            alert('select first')
        } else {
            dispatch(savePaymentMethod(paymentMethod))

            if (Data.userData) {
                navigate('/placeorder')
            }
            else {
                alert("Login First")
                navigate("/login")
            }

        }
    }

    return (
        <div>
            <CheckOutStep step1 step2 step3 />

            <h1 className="d-flex justify-content-center">Payment Method</h1>

            <div className="d-flex justify-content-center"><PaymentIcon style={{ fontSize: "55px", color: "#0d6efd" }} /></div>

            <Form className="d-flex justify-content-center">
                <Form.Group>
                    <Form.Label as='legend' className="mt-3">Select Payment Method</Form.Label>

                    <Col>
                        <Form.Check type='radio'
                            label="Paypal or credit card"
                            id="paypal"
                            name='paymentMethod'
                            value="paypal"
                            // checked
                            onChange={e => setpaymentMethod(e.target.value)}
                        />
                        <Form.Check type='radio'
                            label="Payoneer or credit card"
                            id="paypal"
                            name='paymentMethod'
                            value="paypal"
                            // checked
                            onChange={e => setpaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Form>

            <div className="d-flex justify-content-center mt-4">
                <Button variant="contained" onClick={handleSubmit} endIcon={<ArrowForwardIcon />} className='mb-4' style={{ background: "#ffc107" }}>
                    Continue
                </Button>
            </div>

        </div>

    )
}

export default PaymentMethodScreen
