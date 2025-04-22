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

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            
            {items.length > 0 ? (
                <>
                    <Grid container spacing={2}>
                        {items.map((item) => (
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
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton 
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                disabled={item.quantity <= 1}
                                                color="primary"
                                                size="small"
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            
                                            <Typography sx={{ mx: 1, minWidth: '20px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </Typography>
                                            
                                            <IconButton 
                                                onClick={() => dispatch(incrementQuantity(item.id))}
                                                color="primary"
                                                size="small"
                                            >
                                                <AddIcon />
                                            </IconButton>
                                            
                                            <IconButton 
                                                onClick={() => dispatch(removeItem(item.id))}
                                                color="error"
                                                size="small"
                                                sx={{ ml: 2, color: '#d32f2f', border: '1px solid red' }} // Force color and add border for debugging
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
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
                            Clear Cart
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="h6" align="center" sx={{ my: 4 }}>
                    Your cart is empty
                </Typography>
            )}
        </Box>
    );
};

export default Cart;