import React from "react";
import mealsImage from "../../assets/meals.jpg";
import style from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

// Tis is the header of the webpage ,
const Header = (props)=>{
    return (
        <React.Fragment>
            <header className={style.header}>
                <h1>ReactMeals</h1>                
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={style["main-image"]}>
                <img src={mealsImage} alt="A Table full of food"/>
            </div>
        </React.Fragment>
    );
}
export default Header;