import classes from './Checkout.module.css';
import React from 'react';

const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim().length === 5; 

const Checkout = (props) => {
    const [formInputValidity,setFormInputValidity] = React.useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = React.useRef();
    const streetInputRef = React.useRef();
    const postalCodeInputRef = React.useRef();
    const cityInputRef = React.useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredNamed = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredNamed);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidity({
        name : enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if(!formIsValid){
        return;
    }
    props.onConfirm({
        name : enteredNamed,
        street : enteredStreet,
        city : enteredCity,
        postalCode : enteredPostalCode,
    })
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please Enter a valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please Enter a valid Street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p>Please Enter a valid Postal Code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please Enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;