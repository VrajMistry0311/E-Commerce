import React, { Fragment } from 'react'
import "./Cart.css"
import "./CartItemCard.js"
import CartItemCard from './CartItemCard.js'
import { useSelector, useDispatch } from "react-redux"
import { addToCartItems, removeCartItem } from "../../actions/cartAction"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from '@mui/material'
import { Link, useNavigate } from "react-router-dom"

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addToCartItems(id, newQty));
    }

    const decreseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty < 1) return;
        dispatch(addToCartItems(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeCartItem(id));
    }

    const checkOutHandler = () => {
        navigate("/login?redirect=shipping");
    }
    return (
        <Fragment>
            {cartItems.length === 0 ?
                (
                    <div className='emptyCart'>
                        <RemoveShoppingCartIcon />
                        <Typography>No Items in the Cart</Typography>
                        <Link to='/products'>View Products</Link>
                    </div>
                ) :
                (
                    <Fragment>
                        <div className='cartPage'>
                            <div className='cartHeader'>
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>

                            {cartItems && cartItems.map((item) => (
                                <div className='cartContainer' key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className='cartInput'>
                                        <button onClick={() => decreseQuantity(item.product, item.quantity)}>-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className='cartSubtotal'> {`₹${item.price * item.quantity}`}</p>
                                </div>
                            ))}

                            <div className='cartGrossTotal'>
                                <div></div>
                                <div className='cartGrossTotalBox'>
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.price * item.quantity, 0
                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className='checkOutBtn'>
                                    <button onClick={checkOutHandler}>Check Out</button>
                                </div>
                            </div>

                        </div>
                    </Fragment>
                )}
        </Fragment>
    )
}

export default Cart