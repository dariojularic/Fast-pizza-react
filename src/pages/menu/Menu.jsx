import "./Menu.css";
import PizzaCard from "#pages/menu/components/pizzaCard/PizzaCard";
import Loader from "#layouts/loader/Loader";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "#cartSlice";
import { basePizzaUrl } from "#api";

const Menu = () => {
  const dispatch = useDispatch();
  
  const [pizzaMenu, setPizzaMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //
        const response = await fetch(basePizzaUrl + "menu");
        const data = await response.json();
        data.data.forEach((pizza) => {
          pizza.quantity = 0
          pizza.pizzaId = pizza.id
        });
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
            key={pizza.pizzaId}
            id={pizza.id}
            name={pizza.name}
            ingredients={pizza.ingredients}
            soldOut={pizza.soldOut}
            image={pizza.imageUrl}
            quantity={pizza.quantity}
            price={pizza.unitPrice}
            handler={() => dispatch(addToCart(pizza))}
          />
        );
      })}
    </ul>
  );
};

export default Menu;
