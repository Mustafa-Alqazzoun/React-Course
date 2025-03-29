// /pages/Cart.jsx
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, incrementQuantity, decrementQuantity } from "../slices/cart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

const Cart = () => {
    const items = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    // Log to confirm the component is rendering
    console.log("Cart component rendered with items:", items);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            
            {items.length > 0 ? (
                <>
                    <Grid container spacing={2}>
                        {items.map((item) => {
                            // Log to confirm each item is being rendered
                            console.log("Rendering item:", item.id, item.title);
                            return (
                                <Grid item xs={12} key={item.id}>
                                    <Card sx={{ display: 'flex', width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100, objectFit: 'contain' }}
                                            image={item.image}
                                            alt={item.title}
                                        />
                                        <CardContent sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="h6">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Price: ${item.price}
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '250px', overflow: 'visible', padding: 1 }}>
                                                <IconButton 
                                                    onClick={() => {
                                                        console.log("Decrementing item:", item.id);
                                                        dispatch(decrementQuantity(item.id));
                                                    }}
                                                    disabled={item.quantity <= 1}
                                                    size="small"
                                                    sx={{ 
                                                        display: 'inline-flex !important', 
                                                        visibility: 'visible !important',
                                                        border: '1px solid blue', // For debugging
                                                        color: 'blue' // For debugging
                                                    }}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ mx: 2 }}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton 
                                                    onClick={() => {
                                                        console.log("Incrementing item:", item.id);
                                                        dispatch(incrementQuantity(item.id));
                                                    }}
                                                    size="small"
                                                    sx={{ 
                                                        display: 'inline-flex !important', 
                                                        visibility: 'visible !important',
                                                        border: '1px solid green', // For debugging
                                                        color: 'green' // For debugging
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                                {/* Log to confirm the remove button is being rendered */}
                                                {console.log("Rendering remove button for item:", item.id)}
                                                <IconButton 
                                                    onClick={() => {
                                                        console.log("Removing item:", item.id);
                                                        dispatch(removeItem(item.id));
                                                    }}
                                                    sx={{ 
                                                        ml: 2, 
                                                        display: 'inline-flex !important', 
                                                        visibility: 'visible !important',
                                                        zIndex: 1000, // Ensure it's not overlapped
                                                        border: '2px solid red', // For debugging
                                                        color: 'red', // Temporarily override color="error"
                                                        padding: 1 // Add padding for visibility
                                                    }}
                                                    size="small"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                    
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">
                            Total: ${items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={() => dispatch(clearCart())}
                        >
                            Reset Cart
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="h6" align="center" sx={{ my: 4 }}>
                    Cart is empty
                </Typography>
            )}
        </Box>
    );
};

export default Cart;