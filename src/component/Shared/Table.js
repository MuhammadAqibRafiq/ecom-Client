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

    const Data = useSelector(state => state.userInfo)
    const { token } = Data.userData
    // console.log(Data.userData)

    const { data, isLoading, error } = useMyOrderQuery(token)

    // console.log(data)

    return (
        <TableContainer component={Paper} className="mt-2">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ORDER REF</StyledTableCell>
                        <StyledTableCell align="center">ORDER DATE</StyledTableCell>
                        <StyledTableCell align="center">TOTAL PRICE</StyledTableCell>
                        <StyledTableCell align="center">DELEVIR</StyledTableCell>
                        <StyledTableCell align="center">STATUS</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading ?
                        <>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </>
                        :
                        data.map((elem, ind) => (
                            <StyledTableRow key={ind}>
                                <StyledTableCell component="th" scope="row">
                                    {elem._id}
                                </StyledTableCell>
                                <StyledTableCell align="center">{elem.createdAt.substring(0, 10)}</StyledTableCell>
                                <StyledTableCell align="center">${elem.totalPrice}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {
                                        elem.isDelevired ?
                                            <div style={{ color: "white", background: "#8bc34a", borderRadius: "14px" }}>Deliver</div>
                                            :
                                            <div style={{ color: "white", background: "#f44336", borderRadius: "14px" }}>Pending</div>
                                    }
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {
                                        elem.isPaid ?
                                            <div style={{ background: "#8bc34a", borderRadius: "14px", color: "white" }}>Paid</div>
                                            :
                                            <div style={{ color: "white", background: "#f44336", borderRadius: "14px" }}>
                                                <a href={`/orders/${elem._id}`} style={{ textDecoration: "none", color: "white" }}>
                                                    Not Paid
                                                </a>
                                            </div>
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
