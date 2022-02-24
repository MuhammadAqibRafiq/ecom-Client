import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../features/cartSlice'
import { userInfo } from '../../features/userSlice'
import CheckOutStep from '../Shared/Breadcumb'
import { TextField, Card, Typography, IconButton, CardHeader, Button } from '@mui/material';
import { Container, Col, Row } from 'react-bootstrap';
import "./screen.css"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ShippingScreen = () => {

    const img = "https://images.pexels.com/photos/6170172/pexels-photo-6170172.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-6170172.jpg&fm=jpg"
    const navigate = useNavigate()
    const states = useSelector(state => state.userInfo)

    // if(!userInfo.userData) {
    //     navigate('/login')
    //     console.log(!userInfo.userData)
    // }


    const dispatch = useDispatch()
    const state = useSelector(state => state.cart.shippingAddress)

    const [address, setAddress] = useState(state.address);
    const [city, setCity] = useState(state.city);
    const [postalCode, setPostalCode] = useState(state.postalCode);
    const [country, setCountry] = useState(state.country);

    const handleSubmit = () => {
        if (!address || !city || !postalCode || !country) {
            alert("Fill all fields")
        } else {
            dispatch(saveShippingAddress({ address, city, postalCode, country }))
            navigate('/payment')
        }
    }

    console.log(states.userData)

    return (
        <div>
            <Container>
                <CheckOutStep step1 step2 />

                {/* <Row className="d-flex justify-content-center mt-4" > */}
                <Row className="mt-4" >

                    <Col md={8} className="d-flex">
                        <img src={img} width="100%" />
                    </Col>

                    <Col md={4} style={{ background: "white", borderRadius: "12px" }} >
                        <div style={{ padding: "20px 30px 40px 30px" }} className='d-flex flex-column' >

                            <p className="d-flex justify-content-center" style={{ fontWeight: "700", fontSize: "20px" }}>Shipping Address</p>

                            <div className="d-flex justify-content-center"><LocalShippingIcon style={{ fontSize: "45px" }} /></div>

                            <TextField
                                id="outlined-basic"
                                label="Adress"
                                variant="outlined"
                                name='address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className='mb-3'
                            />

                            <TextField
                                id="outlined-basic"
                                label="City"
                                variant="outlined"
                                name='city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className='mb-3'
                            />
                            <TextField
                                id="outlined-basic"
                                label="Postal Code"
                                variant="outlined"
                                name='postal code'
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className='mb-3'

                            />
                            <TextField
                                id="outlined-basic"
                                label="Country"
                                variant="outlined"
                                name='country'
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className='mb-4'
                            />

                            <Button variant="contained" onClick={handleSubmit} endIcon={<ArrowForwardIcon />} className='mb-4' style={{background:"#ffc107"}}>
                                Continue
                            </Button>

                        </div>
                    </Col>


                </Row>

            </Container>

        </div>
        // <div>
        //     <CheckOutStep step1 step2 />

        //     <h1>Shipping Address</h1>
        //     <input placeholder="Address" type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
        //     <br />

        //     <input placeholder="City" type="text" name='city' value={city} onChange={(e) => setCity(e.target.value)} />
        //     <br />

        //     <input placeholder="Postal Code" type="text" name='postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        //     <br />

        //     <input placeholder="Country" type="text" name='country' value={country} onChange={(e) => setCountry(e.target.value)} />
        //     <br />

        //     <button onClick={handleSubmit}>continue</button>

        // </div>
    )
}

export default ShippingScreen
