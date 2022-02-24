import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ shoe }) {
    const [expanded, setExpanded] = React.useState(false);

    const { image, _id , name, price, rating, countinStock } = shoe

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ minWidth: 280 , m:3 }}  >

            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
            />

            <CardContent style={{ padding: "16px 16px 0px" }}>
                <Link to={`/product/${_id}`} style={{textDecoration:"none",color:"black", fontWeight:"bold" , fontSize:"large"}}> <p>{name}</p> </Link>
                <p >Price : <strong>${price}</strong> </p>
            </CardContent>

            <CardActions disableSpacing className="d-flex justify-content-between">

                <IconButton aria-label="ratting">
                    <Rating name="size-medium" defaultValue={rating} />
                </IconButton>
                <IconButton aria-label="add to favorite">
                    <FavoriteIcon />
                </IconButton>

            </CardActions>

        </Card>
    );
}
