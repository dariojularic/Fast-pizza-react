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

  // const pizzaMenu = fetchData();

  fetchData()
    .then(data => {
      
    })

  // console.log(pizzaMenu)

  return (
    <>
      <h1>Menu Page</h1>
      <ul>
        {/* {pizzaMenu} */}
      </ul>
    </>
  );
};

export default Menu;
