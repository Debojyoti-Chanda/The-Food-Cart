import React from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items : [],
    totalAmount : 0 
};

const cartReducer = (prevState,action)=>{
    if(action.type === "ADD"){
        const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = prevState.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = prevState.items[existingCartItemIndex];
        
        // let updatedItem;
        let updatedItems;

        if(existingCartItem){
            let updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...prevState.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = prevState.items.concat(action.item);
        }

        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    if(action.type === "REMOVE"){

        const existingCartItemIndex = prevState.items.findIndex(item => item.id === action.id);
        const existingItem = prevState.items[existingCartItemIndex];
        const updatedTotalAmount = prevState.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount===1){
            updatedItems = prevState.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...existingItem , amount : existingItem.amount -1 };
            updatedItems= [...prevState.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === "CLEAR"){
        return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState,dispachCartAction] = React.useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = item => {
        dispachCartAction({
            type: "ADD",
            item: item,
        })
    }
    const removeItemFromCartHandler = (id)=>{
        dispachCartAction({
            type: "REMOVE",
            id : id,
        })
    }
    const clearCartHandler = ()=>{
        dispachCartAction({
            type:"CLEAR"
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemToCartHandler,
        removeItem : removeItemFromCartHandler,
        clearCart : clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );

}
export default CartProvider;