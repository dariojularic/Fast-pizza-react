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

  function handleUpdate(event) {
    const { name, type, checked, value } = event.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormInfo({
      ...formInfo,
      [name]: updatedValue,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://react-fast-pizza-api.onrender.com/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData.data.id);
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
          value="First Name"
          name="customer"
          handler={(event) => handleUpdate(event)}
        />
        <OrderNewElement
          value="Phone Number"
          name="phone"
          handler={(event) => handleUpdate(event)}
        />
        <OrderNewElement
          value="Address"
          name="address"
          handler={(event) => handleUpdate(event)}
        />
        <div className="checkbox-container">
          <input
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
