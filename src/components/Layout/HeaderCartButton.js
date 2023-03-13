import React from "react";
import style from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon.js";
import CartContext from "../../store/cart-context";


//showCartHandler changes the state to true , and the Cart is displayed with  props.onClick

const HeaderCartButton = (props)=>{
    const cartCtx = React.useContext(CartContext);
    // const numberOfCartItems = cartCtx.items.length;
    const numberOfCartItems = cartCtx.items.reduce((curNum,item)=>{
        return curNum + item.amount;
    },0);
    const [btnIsHighlighted,setBtnIsHighlighted] = React.useState(false);

    const btnClasses = `${style.button} ${btnIsHighlighted ? style.bump : ""}`;
    React.useEffect(()=>{
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        },100);

        return ()=>{
            clearTimeout(timer);
        }

    },[cartCtx.items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={style.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={style.badge}>{numberOfCartItems}</span>
        </button>
    );
}
export default HeaderCartButton;