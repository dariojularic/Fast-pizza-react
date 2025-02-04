import PizzaCard from "#layouts/pizzaCard/PizzaCard";
import "./Menu.css";
import { useState, useEffect } from "react";
import Loader from "#layouts/loader/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cartSlice";

const Menu = () => {
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const url = "https://react-fast-pizza-api.onrender.com/api/menu";
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        data.data.forEach(pizza => {
          // ocu ovdje stavit da je amount odma 1 ili prvo 0 pa kad dodam u kosaricu povecam na 1
          pizza.amount = 1
          // prvo stavit 0 pa povecat na 1
        })
        setPizzaMenu(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (pizzaMenu.length === 0) return <Loader />;

  return (
    <ul>
      {pizzaMenu.map((pizza) => {
        return (
          <PizzaCard
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            ingredients={pizza.ingredients}
            soldOut={pizza.soldOut}
            image={pizza.imageUrl}
            amount={pizza.amount}
            price={pizza.unitPrice}
            handler={() => dispatch(addToCart(pizza))}
          />
        );
      })}
    </ul>
  );
};




export default Menu;
