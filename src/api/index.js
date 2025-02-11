import { toast } from "react-toastify";

export const basePizzaUrl = "https://react-fast-pizza-api.onrender.com/api/";
export const baseGeolocationUrl =
  "https://api.geoapify.com/v1/geocode/reverse?";

export async function getAddress({ lat, long }) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const street = data.features[0].properties.address_line1;
    const city = data.features[0].properties.city;
    return { street, city };
  } catch (error) {
    console.log(error);
    toast("Ups! Something went wrong...")
  }
}

export const fetchOrderPizza = async (event, formData) => {
  event.preventDefault();

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

    if (!response.ok) {
      const errorData = await response.json();
      // toast("Make sure your cart is not empty");
      // toast(errorData.message);
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    toast(error)
    toast("Ups! Something went wrong...")
  }
};

export const getOrder = async (orderId) => {
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
    return data;
  } catch (err) {
    toast("Ups! Something went wrong...")
    console.error("Error fetching data:", err);
  }
};
