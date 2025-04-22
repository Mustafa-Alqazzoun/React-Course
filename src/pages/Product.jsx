import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../Context/UserContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cart";
import {memo} from "react"

const Product = memo(function Product(props) {
  const [counter, setCounter] = useState(0);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [showButton, setShowButton]= useState(true)
  const dispatch= useDispatch()
  //  const {user}=useContext(UserContext)
  //  console.log(user,"user")
  const navigate= useNavigate()
  const handleIncrement = () => {
    setCounter((counter) => counter + 1);
  };
  const handleDecrement = () => {
    setCounter((counter) => counter - 1);
  };

  useEffect(() => {
    if (counter === props.item.stock) {
      setShowOutOfStock(true);
      setShowButton(false)
    }
  }, [counter]);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.item.image}
        title={props.item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.item.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Price:{props.item.price} EGP
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Description:{props.item.description}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Category:{props.item.category}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          stock:{props.item.stock}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {counter}
        </Typography>
        <Button onClick={()=>navigate(`/items/${props.item.id}`)}>Go to details</Button>
        {/* <Link to={`/items/${props.item.id}`}>go to</Link> */}
        {showButton&&( <>
          {/* <Button onClick={handleIncrement} size="small">
          Increment +
        </Button>
        <Button onClick={handleDecrement} size="small">
          decrement -
        </Button> */}
        <Button onClick={()=>dispatch(addToCart(props.item))}>Add To Cart</Button>
        </>
          )}
       
      </CardActions>
      {showOutOfStock ? (
        <Typography variant="body2" sx={{ color: "red" }}>
          this item is out of stock
        </Typography>
      ) : null}
      {/* {
        showOutOfStock&&(
          <Typography variant="body2" sx={{ color: "red" }}>
            this item is out of stock
          </Typography>
        )
      } */}
    </Card>
  );
})
export default Product;
