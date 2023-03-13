import React from "react";

//This global state needs to be managed by implemented components

const CartContext = React.createContext({
    items: [],
    totalAmount : 0,
    addItem : (item)=>{},
    removeItem : (id)=>{},
    clearCart : ()=>{},
});

export default CartContext;