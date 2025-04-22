import {  useState } from "react";
import Product from "./Product";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { selectorCartCount } from "../slices/cart";
import Calculation from "../memo/Calculation";
import useRequestApi from "../customhooks/useRequestapi";

function Dashboard() {
  //simulate compoennt did mount in class component
  const [products, setProducts] = useState([]);
  const {data, isLoading}=useRequestApi('https://fakestoreapi.com/products')
  const navigate = useNavigate();
  let location = useLocation();
  console.log(location, "location");
  // useEffect(() => {
  //   // fetch('https://fakestoreapi.com/products')
  //   // .then(res=>res.json())
  //   // .then(json=>console.log(json))
  //   axios.get("https://fakestoreapi.com/products").then((res) => {
  //     console.log(res,"result");
  //     setProducts(res.data);
  //   });
  // }, []);
const items=useSelector(selectorCartCount)
console.log(items, "from store")
  return (
    <>
      {/* {products.map((item) => {
        return <Product key={item.id} item={item}/>;
      })} */}
      {isLoading&&<CircularProgress/>}
      {/* <Calculation number={5}/> */}
      <IconButton onClick={() => navigate("/cart")} aria-label="cart">
        <Badge badgeContent={items} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <Button onClick={() => navigate("/createproduct")}>
          Add New Product
        </Button>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((item, index) => (
            <Grid key={item.id} size={{ xs: 2, sm: 4, md: 4 }}>
              <Product item={{ ...item, stock: index + 1 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
export default Dashboard;
