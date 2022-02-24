import React, { useState } from 'react'
import { userInfo } from '../../features/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateRegisterMutation } from '../../services/user'
import { useMyOrderQuery } from "../../services/order"
import { TextField, Card, Typography, IconButton, CardHeader } from '@mui/material';
import { Container, Col, Row } from 'react-bootstrap';
import CardInfo from '../Shared/CardInfo';
import Tables from '../Shared/Table';

const Profile = () => {
    const img = "https://images.pexels.com/photos/9325336/pexels-photo-9325336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    const [createPost, responseInfo] = useUpdateRegisterMutation()
    const { isLoading } = responseInfo

    const dispatch = useDispatch()
    const Data = useSelector(state => state.userInfo)
    const { name, email, token, id } = Data.userData

    const [stateName, setStateName] = useState(name)
    const [statePassword, setStatePassword] = useState("")
    const [statecPassword, setStatecPassword] = useState('')
    const [edit, setEdit] = useState(true)

    const updateProfile = async () => {
        const res = await createPost({ name: stateName, token, password: statePassword })
        dispatch(userInfo(res.data))
        setEdit(true)
    }

    console.log(isLoading)

    return (
        <div >
            <Container className='mt-5' >
                <Row>
                    <Col md={4}>
                        <CardInfo
                            name={name} email={email} date="22-OCT-2022" location="AUSTRALIA" setEdit={setEdit} edit={edit}
                            stateName={stateName} setStateName={setStateName} updateProfile={updateProfile}
                            setStatePassword={setStatePassword} isLoading={isLoading}
                        />
                    </Col>

                    <Col md={8}>
                        <Tables />
                    </Col>

                </Row>
            </Container>

        </div >
    )
}

export default Profile