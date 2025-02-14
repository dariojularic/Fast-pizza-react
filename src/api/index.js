import { toast } from "react-toastify";

export const basePizzaUrl = "https://react-fast-pizza-api.onrender.com/api/";
export const baseGeolocationUrl =
  "https://api.geoapify.com/v1/geocode/reverse?";

export async function getAddress({ lat, long }) {
  try {
    const response = await fetch(
      `${baseGeolocationUrl}lat=${lat}&lon=${long}&apiKey=${
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
    toast("Ups! Something went wrong...");
  }
}

export const fetchOrderPizza = async (formData) => {
  const response = await fetch(`${basePizzaUrl}order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // const errorData = await response.json();
    // ako je error sa backenda, extendam error objekt time sto mi vraca server
    // u file errorhandler napravit CustomError klasu i extendat error objekt
    const error = new Error()
    error.data = {
      message: "Make sure your cart is not empty",
    }
    throw error
  }

  const data = await response.json();
  return data;
};

export const getOrder = async (orderId) => {
  try {
    const response = await fetch(`${basePizzaUrl}order/${orderId}`);

    if (!response.ok) {
      const errorData = await response.json();
      toast("Check order ID. You don't need # in front the ID.");
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    toast(err);
    console.error("Error fetching data:", err);
  }
};
