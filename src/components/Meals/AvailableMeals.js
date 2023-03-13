import React from "react";
import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];
const AvailableMeals = ()=>{
    const [meals,setMeals] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    const [httpError,setHttpError] = React.useState();
    React.useEffect(()=>{
      const fetchMeals = async () => {
        const respones = await fetch("https://react-project-cd7cd-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json");
        if(!respones.ok){
          throw new Error("Something Went Wrong");
        }
        const responseData = await respones.json();
        const loadedMeals = [];
        for(const key in responseData){
          loadedMeals.push({
            id : key,
            name : responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      };
      
        fetchMeals().catch( error => {
          setIsLoading(false);
          setHttpError(error.message);
        }); 

    },[]);

    if(isLoading){
      return  (<section className={style.MealsLoading}>
                <p>Loading...</p>
              </section>);
    }
    if(httpError){
      return (
        <section className={style.MealsError}>
          <p>{httpError}</p>
        </section>
      );
    }

    const mealsList = meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
    return (
      <section className={style.meals}>
      <Card>
          <ul>{mealsList}</ul>
      </Card>
      </section>
    );
}
export default AvailableMeals;