import "#pages/order/ordernew/OrderNew.css";
import OrderNewElement from "#pages/order/ordernew/components/OrderNewElement";
import Button from "#components/Button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { totalPrice, clearCart } from "#cartSlice";
import { useState } from "react";
import { handleSubmit } from "#api/index.js";
import { getAddress } from "#api";

function OrderNew() {
  const dispatch = useDispatch();
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
  // jel moze ToastContainer ic u SharedLayouts???

  // pogledat zod za validaciju
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

  function getCoords() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const [lat, long] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          resolve({ lat, long });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    });
  }



  return (
    <div className="order-new-container">
      <h2>Ready to order? Let's go!</h2>
      {/* gdje ide ToastContainer??? */}
      <ToastContainer />
      <form className="order-form">
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
            handler={() => {
              getCoords()
                .then((coords) => getAddress(coords))
                .then((address) => {
                  setFormInfo({
                    ...formInfo,
                    address: address.street + " " + address.city,
                  });
                });
            }}
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

        <Button
          type="button"
          value={`ORDER NOW FOR €${
            formInfo.priority
              ? Math.round(total * 1.2).toFixed(2)
              : total.toFixed(2)
          }`}
          style="btn"
          handler={(event) => {
            if (!checkOrderValidity(formInfo)) {
              toast("Please fill in all the required (*) fields");
              return;
            }
            handleSubmit(event, formInfo).then((data) => {
              const orderId = data.data.id;
              navigate(`/order/${orderId}`);
              dispatch(clearCart());
            });
          }}
        />
      </form>
    </div>
  );
}

export default OrderNew;
