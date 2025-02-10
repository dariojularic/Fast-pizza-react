import { toast } from "react-toastify";
import { useParams } from "react-router-dom";




export const basePizzaUrl = "https://react-fast-pizza-api.onrender.com/api/";
export const baseGeolocationUrl =
  "https://api.geoapify.com/v1/geocode/reverse?";

export function getLocation() {

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const [lat, long] = [position.coords.latitude, position.coords.longitude];

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json()
      const street = data.features[0].properties.address_line1;
      const city = data.features[0].properties.city;
      console.log(street, city)
      return {street, city}


        // .then((result) => result.json())
        // .then((data) => {
        //   // setFormInfo({
        //   //   ...formInfo,
        //   //   address: street + " " + city,
        //   // });
        //   return { street, city };
        // });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
      }
    )
}

console.log(getLocation())
console.log("fa")


const handleSubmit = async (formData, event) => {
  event.preventDefault();

  // if (!checkOrderValidity(formData)) {
  //   toast("Please fill in all the required (*) fields");
  //   return;
  // }

  try {
    const response = await fetch(
      "https://react-fast-pizza-api.onrender.com/api/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   toast("Make sure your cart is not empty");
    //   toast(errorData.message);
    //   throw new Error(errorData.message);
    // }

    const data = await response.json();
    // const orderId = data.data.id;
    return data
    // navigate(`/order/${orderId}`);
    // dispatch(clearCart());
  } catch (error) {
    console.log(error);
  }
};
const ge = (event) => handleSubmit("asf", event)
console.log(ge)
console.log((event) => handleSubmit("asf", event))


const getOrder = (orderId) => {
  async function fetchData() {
    try {
      const response = await fetch(
        `https://react-fast-pizza-api.onrender.com/api/order/${orderId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast("Check order ID. You don't need # in front the ID.");
        toast(errorData.message);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  fetchData();
}
