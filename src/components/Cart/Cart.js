import React from "react";
import Modal from "../UI/Modal";
import style from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props)=>{
    const [isCheckOut,setIsCheckOut] = React.useState(false);
    const [isSubmitting,setIsSubmitting] = React.useState(false);
    const [didSubmit, setDidSubmit] = React.useState(false);
    const cartCtx = React.useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item =>{
        cartCtx.addItem({...item,amount:1})
    }

    const orderHandler = ()=>{
        setIsCheckOut(true);
    }
    const submitOrderHandler = async (userData)=>{
        setIsSubmitting(true);
        await fetch("https://react-project-cd7cd-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", {
            method : "POST",
            body : JSON.stringify({
                user : userData,
                orderedItems : cartCtx.items
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = cartCtx.items.map((item)=>{
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
          />
        );
    })
    const modalAction = <div className={style.actions}>
                            <button className={style["button--alt"]} onClick={props.onClose}>Close</button>
                            {hasItems && <button className={style.button} onClick={orderHandler} >Order</button>}
                        </div>
    const cartModalContent = 
    <React.Fragment>
            <ul className={style["cart-items"]}>
                {cartItems}
            </ul>
            <div className={style.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
            {!isCheckOut && modalAction}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Order Data...</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order</p>
        <div className={style.actions}>
            <button className={style.button} onClick={props.onClose}>Close</button>
        </div>
        </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>

    );
}
export default Cart;