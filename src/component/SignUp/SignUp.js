import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/user'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Container, Col, Row } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [alert, setAlert] = useState();
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState();

    const [loading, setLoading] = useState(false);

    const [createPost, responseInfo] = useRegisterMutation()

    const [user, setUser] = useState([
        { name: "", email: "", password: "" }
    ]);

    let name, value;

    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const Register = async () => {

        try {
            if (!user.name || !user.email || !user.password) {
                setColor("error")
                setOpen(true);
                setAlert("Fill all Fields")

            } else {
                const res = await createPost(user)
                console.log(res)
                if (res.error) {
                    // console.log(res.error.data)
                    // alert(res.error.data.error)
                    setColor("error")
                    setOpen(true);
                    setAlert(res.error.data.error)
                } else {
                    // dispatch(userInfo(res))
                    // alert("signUp succesfull")
                    setColor("success")
                    setOpen(true);
                    setAlert("Sign Up Successfull")
                    
                    navigate('/login')
                }
            }


        }
        catch (err) { alert(err) }

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }} >
                <Alert severity={color} sx={{ width: '100%' }} onClose={handleClose}>
                    {alert}
                </Alert>
            </Snackbar>


            <Container>
                <Row className="d-flex justify-content-center mt-4">

                    <Col md={5} >
                        <div style={{ border: "solid 1px #eae8e8", padding: "7px 40px 7px 40px" }} className='d-flex flex-column' >

                        <div className="d-flex justify-content-center">
                            <img  src="https://i.pinimg.com/564x/fd/13/3e/fd133e9e17ebcd7f75b17a29efa755d3.jpg" style={{ width: "30%" }} />
                        </div>

                            <p className="d-flex justify-content-center" style={{ fontWeight: "700", fontSize: "20px" , marginBottom:"0px" }}>SIGN UP NOW</p>

                            <p className="d-flex justify-content-center" style={{ fontSize: "11px" }}>Please fill the details and create account</p>

                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                name='name'
                                value={user.name}
                                onChange={handleInput}
                                className='mb-3'
                            />

                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                name='email'
                                value={user.email}
                                onChange={handleInput}
                                className='mb-3'
                            />
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                name='password'
                                value={user.password}
                                onChange={handleInput}
                                className='mb-4'
                                type="password"
                            />
                            {loading === false ?
                                <Button variant="contained" color="secondary" onClick={Register} className='mb-4'>Register</Button>
                                :
                                <LoadingButton loading variant="outlined">
                                    Submit
                                </LoadingButton>
                            }

                            <div className='d-flex justify-content-center'>
                                <p>
                                    Already Registered ?
                                    <a href='/login' style={{ color: "blue", textDecoration: 'none', fontWeight: "600" }}>&nbsp; Login &nbsp;</a>
                                </p>
                            </div>
                        </div>
                    </Col>


                </Row>

            </Container>


        </div>
    )
}

export default SignUp
