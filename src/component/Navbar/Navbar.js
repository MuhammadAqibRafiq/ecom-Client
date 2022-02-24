import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/userSlice'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MUISwitch from "../Shared/switch"
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 15,
    height: 18,
    fontSize: "14px",
    padding: "8px",
    left: "7px",
    top: "-5px"
}));


const Navbars = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userInfo)
    const { userData } = userLogin

    const [open, setOpen] = useState(false);

    const logoutHandler = () => {
        dispatch(logout())
        setOpen(true);
    }

    const cart = useSelector(state => state.cart)

    const length = cart.cartItems.length

    const logo = "https://www.nike.com/assets/experience/ciclp/landing-pages/static/v2/189-7f83487975a/static/icons/jordan.svg"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                    Logout Successfull
                </Alert>
            </Snackbar>

            <div className='d-flex justify-content-between align-items-center'>
                <div style={{paddingLeft:"5px"}}>
                    <img src={logo} />
                    <svg height="24px" width="24px" fill="#111" viewBox="0 0 39 33"><path d="M10.94 25.626l-4.236-5.501L.201 22.28l3.734-5.756L.11 10.777l6.59 2.031 4.026-5.474.14 6.785 6.64 2.175-6.594 2.446.028 6.886zm.824 7.239l13.952-16.393L11.806.107h11.697l14.871 16.389-14.8 16.369h-11.81z"></path></svg>
                </div>

                <div className='d-flex'>

                    <p style={{ marginRight: "6px", fontSize: "0px", marginBottom: "0px" }} className="d-flex align-items-center"><FavoriteBorderIcon /></p>
                    <Divider orientation="vertical" variant="middle" flexItem style={{ height: "15px" }} />
                    <p style={{ marginRight: "10px", marginBottom: "0px", padding: "4px" }}>Help</p>
                    <Divider orientation="vertical" variant="middle" flexItem style={{ height: "15px" }} />
                    <p style={{ marginLeft: "6px", fontSize: "0px", marginBottom: "0px" }}><MUISwitch defaultChecked /></p>

                </div>
            </div>

            <Navbar collapseOnSelect expand="lg" style={{ background: "#e5e5e5" }}>

                <Container>
                    <Navbar.Brand href="/">
                        <svg className="pre-logo-svg" height="25px" width="60px" fill="#111" viewBox="0 0 69 32">
                            <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.2 5.12 2.16 7.52Q11.2 18 14 18q2.24 0 5.04-.72z"></path>
                        </svg>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav >
                            <Nav.Link href="/cart" className="d-flex align-items-center">
                                <Badge badgeContent={length} color="secondary">
                                    <AddShoppingCartIcon />
                                </Badge>
                            </Nav.Link>

                            {
                                userData === null ?
                                    <>
                                        <Nav.Link href="/login" className="d-flex align-items-center">Login</Nav.Link>
                                        <Nav.Link href="/signup" className="d-flex align-items-center">SignUp</Nav.Link>
                                    </>
                                    :
                                    userData ?
                                        <NavDropdown title=
                                            {<Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            >
                                                <Avatar alt={userData.name} src="/static/images/avatar/2.jpg" />
                                            </Badge>}
                                            id="collasible-nav-dropdown">
                                            <NavDropdown.Item >{userData.name}</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                        :
                                        null
                            }


                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>


        </>
    )
}

export default Navbars
