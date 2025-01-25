import PizzaCard from "../../layouts/pizzaCard/PizzaCard";

const Menu = () => {
  const url = "https://react-fast-pizza-api.onrender.com/api/menu";

  async function fetchData() {
    try {
      const response = await fetch(url);
      if (response.status !== 200) throw new Error("Something went wrong!");
      const data = await response.json();
      console.log(data.data);
      return data;
    } catch (error) {
      alert(error);
    }
  }

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

  return (
    <>
      <h1>Menu Page</h1>
      <ul>
        {() => {
          fetchData().then((data) => {
            data.data.map((pizza) => {
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
            });
          });
        }}
      </ul>
    </>
  );
};

export default Menu;
