import React, { useState } from 'react'
import { useGetProductsByIdQuery } from '../../services/getProducts'
import { Card, Container, ListGroupItem, Form, Col, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cartSlice'
import { TextField, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Productinfo = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const { data, isLoading, error } = useGetProductsByIdQuery(id)

    const [qty, setQty] = useState(1)

    const addCart = () => {

        // navigate(`/cart/${id}`)
        // navigate(`/cart/${id}/qty=${qty}`)

        dispatch(addToCart(data))

    }


    return (
        <div>

            {isLoading ? 'LOADING' : error ? "check ERROR" :
                <Container className="mt-5">
                    <Row>
                        <Col md={5}>
                            <Card.Img variant="top" src={data.image} width="100%" height="100%" />
                        </Col>

                        <Col md={7}>
                            <Card.Body>
                                <Card.Title>{data.name}</Card.Title>
                                <Card.Text>
                                    {data.discription}
                                </Card.Text>
                            </Card.Body>


                            <div className='Chart-Size m-2'>
                                <Button variant="outlined" className="m-2">5.5</Button>
                                <Button variant="outlined" className="m-2">6</Button>
                                <Button variant="outlined" className="m-2">6.5</Button>
                                <Button variant="outlined" className="m-2">7</Button>
                                <Button variant="outlined" className="m-2">7.5</Button>
                                <Button variant="outlined" className="m-2">8</Button>
                                <Button variant="outlined" className="m-2">8.5</Button>
                                <Button variant="outlined" className="m-2">9</Button>
                                <Button variant="outlined" className="m-2">10</Button>
                                <Button variant="outlined" className="m-2">11</Button>
                            </div>


                            <Card.Footer>
                                Price : $<small className="text-muted">{data.price}</small>
                            </Card.Footer>

                            <Card.Footer>
                                Quantity : <small className="text-muted"> {data.countinStock}</small>
                                {/* <ListGroupItem>
                                    <Form as='select' value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {
                                            [...Array(data.countinStock).keys()].map((x) => (
                                                <option value={x + 1} key={x + 1}>  {x + 1} </option>
                                            ))
                                        }
                                    </Form>
                                </ListGroupItem> */}
                            </Card.Footer>


                            <div className="d-flex justify-content-center mt-3" >
                                <Button onClick={addCart} style={{ width: "50%", background: "black" }} variant="contained" startIcon={<ShoppingCartIcon />} >Add to Cart</Button>
                            </div>

                            <div className="d-flex justify-content-center mt-3" >
                                <Button style={{ width: "50%", color: "black", border: "1px solid grey" }} variant="outlined" startIcon={<FavoriteBorderIcon />} >Favorite</Button>
                            </div>

                        </Col>
                    </Row>

                </Container>
            }
        </div>
    )
}

export default Productinfo
