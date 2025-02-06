import "#pages/order/ordernew/OrderNew.css";
import OrderNewElement from "#pages/order/ordernew/components/OrderNewElement";
import { Link, useNavigate } from "react-router-dom";
import Button from "#components/Button";
import { useSelector } from "react-redux";

function OrderNew() {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    // const form = event.target.form

    // console.log(form)
    console.log(cart);

    const formData = new FormData(event.target.form);
    const data = Object.fromEntries(formData.entries());
    console.log("data", data);

    const dataToSend = {
      ...data,
      priority: data.priority === "on",
      cart,
      position: "",
    };

    console.log("dataToSend", dataToSend);

    fetch("https://react-fast-pizza-api.onrender.com/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
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
        action="https://react-fast-pizza-api.onrender.com/api/order"
      >
        <OrderNewElement value="First Name" name="customer" />
        <OrderNewElement value="Phone Number" name="phone" />
        <OrderNewElement value="Address" name="address" />
        <div className="checkbox-container">
          <input className="checkbox-input" type="checkbox" name="priority" />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <Link to="/menu">
          <Button
            type="button"
            value={`ORDER NOW FOR €`}
            style="btn"
            handler={(event) => {
              handleSubmit(event)
              navigate("/menu")
            }}
          />
        </Link>
      </form>
    </div>
  );
}

export default OrderNew;

// "Invalid input data. Cast to Number failed for value "NaN" (type number) at path "totalPrice". Cast to Number failed for value "NaN" (type number) at path "totalPrice". Cast to Number failed for value "NaN" (type number) at path "totalPrice". Cast to Number failed for value "NaN" (type number) at path "orderPrice". Quantity is required. Pizza id is required. Quantity is required. Pizza id is required. Quantity is required. Pizza id is required"
