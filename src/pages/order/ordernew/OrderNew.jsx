import "#pages/order/ordernew/OrderNew.css";
import OrderNewElement from "#pages/order/ordernew/components/OrderNewElement";
import { Link } from "react-router-dom";
import Button from "#components/Button";

function OrderNew() {

  const handleSubmit = (event) => {
    // event.preventDefault()

    fetch("https://react-fast-pizza-api.onrender.com/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("Success:", responseData)
      })
      .catch(error => {
        console.error("Error", error)
      })
  }


  return (
    <div className="order-new-container">
      <h2>Ready to order? Let's go!</h2>
      <form onSubmit={() => handleSubmit()} className="order-form" method="POST" action="https://react-fast-pizza-api.onrender.com/api/order">
        <OrderNewElement value="First Name" name="first-name" />
        <OrderNewElement value="Phone Number" name="phone-number" />
        <OrderNewElement value="Address" name="address" />
        <div className="checkbox-container" >
          <input className="checkbox-input" type="checkbox" name="priority" />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>
        {/* <Link> */}
          <Button type="button" value={`ORDER NOW FOR €`} style="btn" handler={() => handleSubmit()} />
        {/* </Link> */}
      </form>
    </div>
  );
}

export default OrderNew;
