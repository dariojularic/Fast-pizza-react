import PizzaCard from "../../layouts/pizzaCard/PizzaCard";
import "./Menu.css";
import { useState, useEffect } from "react";
import Loader from "../../layouts/loader/Loader";

const Menu = () => {
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const url = "https://react-fast-pizza-api.onrender.com/api/menu";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPizzaMenu(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (pizzaMenu.length === 0) return <Loader />;

  return (
    <>
      <ul>
        {pizzaMenu.map((pizza) => {
          return (
            <PizzaCard
              key={pizza.id}
              name={pizza.name}
              ingredients={pizza.ingredients}
              soldOut={pizza.soldOut}
              image={pizza.imageUrl}
              price={pizza.unitPrice}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Menu;
