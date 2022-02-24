import React from 'react'
import { TextField, Card, IconButton, CardHeader, Button, Skeleton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { LocationOn, Edit } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const CardInfo = ({ name, email, date, location, setEdit, edit, stateName, setStateName, setStatePassword, updateProfile, isLoading }) => {
    const img = "https://images.pexels.com/photos/9325336/pexels-photo-9325336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

    const toggle = () => {
        setEdit(!edit)
    }

    return (
        <>

            <Card >
                {isLoading ?
                    <>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </>
                    :
                    <div className='d-flex justify-content-center'>
                        <Avatar src={img} sx={{ width: 86, height: 86 }} />
                        <div className="d-flex flex-column justify-content-end">
                            <IconButton aria-label="settings">
                                <Edit onClick={toggle} />
                            </IconButton>
                        </div>
                    </div >
                }
                {!edit ?
                    <div className="d-flex flex-column">
                        <TextField className="m-3" id="standard-basic" label="Name" variant="standard" name='name' value={stateName} onChange={(e) => setStateName(e.target.value)} />
                        <TextField className="m-3" id="standard-basic" label="Email" disabled variant="standard" value={email} />
                        <TextField className="m-3" id="standard-basic" label="Password" variant="standard" type="password" name='password' onChange={(e) => setStatePassword(e.target.value)} />
                        <Button className="m-3" style={{ color: 'white', background: "#30454e" }} onClick={updateProfile}>SAVE</Button>
                    </div>
                    :
                    <>
                        <CardHeader className="mt-2" style={{ padding: "10px" }}
                            title={name}
                        />
                        <CardHeader style={{ padding: "10px" }}
                            action={
                                <IconButton aria-label="settings">
                                    <AlternateEmailIcon />
                                </IconButton>
                            }

                            title={email}
                            subheader={date}
                        />
                        <CardHeader style={{ padding: "10px" }}
                            action={
                                <IconButton aria-label="settings">
                                    <LocationOn />
                                </IconButton>
                            }
                            title={location}
                        />
                    </>
                }

            </Card>
        </>
    )
}

export default CardInfo
