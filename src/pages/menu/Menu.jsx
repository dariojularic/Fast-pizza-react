import PizzaCard from "../../layouts/pizzaCard/PizzaCard";
import "./Menu.css";
import { useState, useEffect } from "react";
import Loader from "../../layouts/loader/Loader";

const Menu = () => {
  const [pizzaMenu, setPizzaMenu] = useState([]);
  const url = "https://react-fast-pizza-api.onrender.com/api/menu";

  // async function fetchData() {
  //   try {
  //     const response = await fetch(url);
  //     if (response.status !== 200) throw new Error("Something went wrong!");
  //     const data = await response.json();
  //     console.log(data.data);
  //     setPizzaMenu(data);
  //     return data;
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.data);
        setPizzaMenu(data.data);
        // console.log(pizzaMenu);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(pizzaMenu);

  // fetchData();

  // const pizzaMenu = fetchData();

  // fetchData().then((data) => {
  //   console.log(data.data);
  //   data.data.map((pizza) => {
  //     return (
  //       <PizzaCard
  //         key={pizza.id}
  //         name={pizza.name}
  //         ingredients={pizza.ingredients}
  //         soldOut={pizza.soldOut}
  //         image={pizza.imageUrl}
  //         price={pizza.unitPrice}
  //       />
  //     );
  //   });
  // });

  // console.log(pizzaMenu)

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
        {/* {fetchData().then((data) => {
          console.log(pizzaMenu);
          return data.data.map((pizza) => {
          });
        })} */}
      </ul>
    </>
  );
};

export default Menu;
