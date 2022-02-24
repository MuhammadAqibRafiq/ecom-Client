import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../services/user'
import { userInfo } from '../../features/userSlice'
import { TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Container, Col, Row } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [alert, setAlert] = useState();
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState();


    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([
        { email: "", password: "" }
    ]);

    const [createPost, responseInfo] = useLoginMutation()

    // const { data, isSucces, isLoading, isUninitialized } = responseInfo

    let name, value;

    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }


    const Login = async () => {

        try {
            const res = await createPost(user)
            console.log(res)
            if (res.error) {
                setColor("error")
                setOpen(true);
                setAlert("Login Error")
            } else {
                setColor("success")
                setOpen(true);
                setAlert("Login Successfull")

                setLoading(true);
                dispatch(userInfo(res.data));
                navigate('/');

            }
        }
        catch (err) { alert(err) }

    }
    console.log(user)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }} >
                <Alert severity={color} sx={{ width: '100%' }} onClose={handleClose}>
                    {alert}
                </Alert>
            </Snackbar>


            <Row className="d-flex justify-content-center mt-4">


                <Col md={5} >
                    <div style={{ border: "solid 1px #eae8e8", padding: "20px 40px 40px 40px" }} className='d-flex flex-column' >

                        <div className="d-flex justify-content-center">
                            <img  src="https://i.pinimg.com/236x/ca/2d/cc/ca2dccd8904d3f978cc7192234761fed.jpg" style={{ width: "20%" }} />
                        </div>

                        <p className="d-flex justify-content-center" style={{ fontWeight: "700", fontSize: "20px" }}>LOG IN NOW</p>

                        <p className="d-flex justify-content-center" style={{ fontSize: "11px" }}>Please login to continue using our app</p>

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
                            <Button variant="contained" onClick={Login} className='mb-4'>Sign in</Button>
                            :
                            <LoadingButton loading variant="outlined">
                                Submit
                            </LoadingButton>
                        }

                        <div>
                            <p className='d-flex justify-content-center'>
                                If you have'nt Account ?
                                <a href='/signup' style={{ color: "#b2004c", textDecoration: 'none', fontWeight: "600" }}>&nbsp; Sign up &nbsp;</a>
                                first
                            </p>

                            <p className='d-flex justify-content-center' style={{ color: "#1976d2", textDecoration: 'none', fontWeight: "600" }}>
                                Forget Password ?
                            </p>
                        </div>

                    </div>
                </Col>

            </Row>
        </Container>

    )
}

export default Login



{/* <input placeholder='email..' type="email" name='email' value={user.email} onChange={handleInput} />
            <br />
            <input placeholder='password' type='password' name='password' value={user.password} onChange={handleInput} />
            <br />

            <button onClick={Login}>LOGIN</button> */}