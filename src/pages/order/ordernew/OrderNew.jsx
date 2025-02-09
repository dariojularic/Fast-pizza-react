import "#pages/order/ordernew/OrderNew.css";
import OrderNewElement from "#pages/order/ordernew/components/OrderNewElement";
import { Link, useNavigate } from "react-router-dom";
import Button from "#components/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import { totalPrice } from "../../../cartSlice";

function OrderNew() {
  const { cart } = useSelector((state) => state.cart);
  const { username } = useSelector((state) => state.user);
  const total = useSelector(totalPrice);
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    address: "",
    cart: cart,
    customer: username,
    phone: "",
    position: "",
    priority: false,
  });

  // gdje drzim apiKey???
  const apiKey = "681243a98ce04bfab9430b85cdb1ee9f";

  function handleUpdate(event) {
    const { name, type, checked, value } = event.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormInfo({
      ...formInfo,
      [name]: updatedValue,
    });
  }


  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const [lat, long] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${apiKey}`
        )
          .then((result) => result.json())
          .then((data) => {
            // console.log(data.features[0].properties.address_line1)
            // console.log(data.features[0].properties.city)
            const street = data.features[0].properties.address_line1
            const city = data.features[0].properties.city
            setFormInfo({
              ...formInfo,
              address: street + " " + city
            })
            console.log(formInfo)
          });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // moram jos doradit errore
    fetch("https://react-fast-pizza-api.onrender.com/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
      .then((response) => response.json())
      .then((responseData) => {
        const orderId = responseData.data.id;
        navigate(`/order/${orderId}`);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div className="order-new-container">
      {/* provjerit apostrof */}
      <h2>Ready to order? Let's go!</h2>
      <form
        onSubmit={() => handleSubmit()}
        className="order-form"
        method="POST"
        // koja je svrha ovog action i method ako ga imam u fetchu???
        action="https://react-fast-pizza-api.onrender.com/api/order"
      >
        <OrderNewElement
          id="customer"
          value="First Name"
          name="customer"
          handler={(event) => handleUpdate(event)}
        />
        <OrderNewElement
          id="phone"
          value="Phone Number"
          name="phone"
          handler={(event) => handleUpdate(event)}
        />
        <div className="relative">
          <OrderNewElement
            id="address"
            value="Address"
            name="address"
            handler={(event) => handleUpdate(event)}
          />
          <Button
            // name="address"
            style="btn position-btn"
            type="button"
            value="GET POSITION"
            handler={() => getLocation()}
          />
        </div>
        <div className="checkbox-container">
          <input
            id="priority"
            className="checkbox-input"
            type="checkbox"
            name="priority"
            onChange={(event) => handleUpdate(event)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <Link to="/menu">
          <Button
            type="button"
            value={`ORDER NOW FOR €${total}`}
            style="btn"
            handler={(event) => {
              handleSubmit(event);
            }}
          />
        </Link>
      </form>
    </div>
  );
}

export default OrderNew;
