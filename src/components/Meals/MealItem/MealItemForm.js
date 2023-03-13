import React from "react";
import Input from "../../UI/Input";
import style from "./MealItemForm.module.css";

const MealItemForm = (props)=>{
    const [amountIsValid,setAmountIsValid]=React.useState(true);
    const amountInputRef = React.useRef()

    const submitHandler = evt =>{
        evt.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = parseInt(enteredAmount);
        if(enteredAmount.trim().length === 0 || enteredAmountNumber<1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return ;
        }
        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form action="" className={style.form} onSubmit={submitHandler}>
            <Input label="Amount" ref={amountInputRef} input={{
                id:"amount_" + props.id,
                type: "number",
                min : "1",
                max :"5",
                step: "1",
                defaultValue: "1",
            }}/>
            <button >+ Add</button>
            {!amountIsValid && <p>Please Enter A valid Amount 1 to 5</p>}
        </form>
    );
}
export default MealItemForm;