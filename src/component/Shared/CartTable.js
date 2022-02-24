import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux'
import { useMyOrderQuery } from "../../services/order"
import { Button, ButtonGroup, TextField, IconButton, } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../../App.css'
import { removeFromCart, removeAll, decreaseFromQty, increaseFromQty } from '../../features/cartSlice'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




export default function CustomizedTables() {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleDecrease = (cartItem) => {
        dispatch(decreaseFromQty(cartItem))
    }

    const handleIncrease = (cartItem) => {
        dispatch(increaseFromQty(cartItem))
    }
    return (
        <TableContainer component={Paper} className="mt-2">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                    {/* {isLoading ?
                        <>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </>
                        : */}

                    {
                        cart.cartItems.map((cartItem, ind) => (

                            <StyledTableRow key={cartItem._id}>

                                <StyledTableCell width="20%" >
                                    <img src={cartItem.image} alt={cartItem.name} width="100px" style={{ borderRadius: "50%", height: "100px" }} />
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {cartItem.name}
                                    <p>Cart in Stock: {cartItem.countinStock}</p>
                                </StyledTableCell>


                                <StyledTableCell align="center">
                                    <ButtonGroup variant="outlined" aria-label="outlined button group" style={{ fontSize: '20px' }}>
                                        <Button onClick={() => handleDecrease(cartItem)} ><RemoveIcon /></Button>
                                        <Button disabled>{cartItem.qty}</Button>
                                        <Button onClick={() => handleIncrease(cartItem)} ><AddIcon /></Button>
                                    </ButtonGroup>
                                </StyledTableCell>

                                <StyledTableCell align="center">${cartItem.price}</StyledTableCell>

                                <StyledTableCell align="center">${cartItem.price * cartItem.qty}</StyledTableCell>

                                <StyledTableCell>
                                    <IconButton aria-label="settings">
                                        <HighlightOffIcon onClick={() => handleRemoveFromCart(cartItem)} />
                                    </IconButton>
                                </StyledTableCell>

                            </StyledTableRow>
                        ))
                    }




                </TableBody>
            </Table>
        </TableContainer >
    );
}