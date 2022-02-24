import React from 'react'
import { useGetProductsQuery } from '../../services/getProducts'
import { Card, Container, CardGroup } from 'react-bootstrap'
import CardProducts from "../Shared/CardProducts"

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const HomePage = () => {

    const products = useGetProductsQuery()

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    }));
    const logo = "https://www.nike.com/assets/experience/ciclp/landing-pages/static/v2/189-7f83487975a/static/icons/jordan.svg"

    return (
        <>
            <div className='d-flex justify-content-center mt-2'>
                <img src={logo} width="15%" />
            </div>

            <div className="d-flex flex-wrap justify-content-center">

                {products.data && products.data.map((shoe) => {
                    return (

                        <CardProducts key={shoe._id} shoe={shoe} />

                    )

                })}

            </div>
        </>
    )
}

export default HomePage
