import "#pages/order/ordernew/OrderNew.css";
import OrderNewElement from "#pages/order/ordernew/components/OrderNewElement";
import Button from "#components/Button";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { totalPrice, clearCart } from "#cartSlice";
import { useState } from "react";

function OrderNew() {
  const dispatch = useDispatch()
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

  // ocu ispraznit cart kad submitam narudbu?
  // gdje drzim apiKey???
  const apiKey = "681243a98ce04bfab9430b85cdb1ee9f";

  // vidjeti za .env file enviroment
  // dodat apikey u njega i exportat ga

  function checkOrderValidity(order) {
    if (order.customer === "") return false;
    if (order.phone === "") return false;
    if (order.address === "") return false;
    return true;
  }

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
            const street = data.features[0].properties.address_line1;
            const city = data.features[0].properties.city;
            setFormInfo({
              ...formInfo,
              address: street + " " + city,
            });
            console.log(formInfo);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!checkOrderValidity(formInfo)) {
      toast("Please fill in all the required (*) fields");
      return;
    }

    try {
      const response = await fetch(
        "https://react-fast-pizza-api.onrender.com/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInfo),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast("Make sure your cart is not empty");
        toast(errorData.message);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const orderId = data.data.id;
      navigate(`/order/${orderId}`);
      dispatch(clearCart())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="order-new-container">
      <h2>Ready to order? Let's go!</h2>
      {/* gdje ide ToastContainer??? */}
      <ToastContainer />
      <form onSubmit={() => handleSubmit()} className="order-form">
        <OrderNewElement
          id="customer"
          inputValue={formInfo.customer}
          labelValue="Name *"
          name="customer"
          handler={(event) => handleUpdate(event)}
        />
        <OrderNewElement
          id="phone"
          inputValue={formInfo.phone}
          labelValue="Phone Number *"
          name="phone"
          handler={(event) => handleUpdate(event)}
        />
        <div className="relative">
          <OrderNewElement
            id="address"
            inputValue={formInfo.address}
            labelValue="Address *"
            name="address"
            handler={(event) => handleUpdate(event)}
          />
          <Button
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
            value={`ORDER NOW FOR €${formInfo.priority ? (Math.round(total * 1.2).toFixed(2)) : total.toFixed(2)}`}
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
