import "#pages/order/ordernew/OrderNew.css";
import OrderNewElement from "#pages/order/ordernew/components/OrderNewElement";
import Button from "#components/Button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { totalPrice, clearCart } from "#cartSlice";
import { useState } from "react";
import { fetchOrderPizza } from "#api/index.js";
import { getAddress } from "#api";
import { z } from "zod";

// napravit funkciju parseZodErrors
// prima error koji vrati zodValidator funkcija
// i onda to proslijedim toastu

// glavni problem za rijesiti je :
// potencijalni error koji moze doc unutar api foldera (server mi je vratio error)
// potencijalni error koji moze doc validacijski zod
// potencijalni error koji moze doc nezavisno od mene
// sve ovo sinkronizovat sa uspjesno vracenim pizama

const formSchema = z
  .object({
    address: z.string().min(5),
    customer: z
      .string()
      .min(3, { message: "Name must contain at least 3 characters" }),
    phone: z
      .string()
      .min(6, { message: "Phone number must contain at least 6 digits" }),
    position: z.string().optional(),
    priority: z.boolean(),
    // cart: z.array().min(1),
  })
  .required();

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

  function parseZodErrors(errorArray) {
    errorArray.forEach((err) => {
      toast(err.message);
    });
  }

  // jel moze ToastContainer ic u SharedLayouts???
  function checkFormValidity(formData) {
    try {
      const a = formSchema.parse(formData);
      console.log("baegab", a);
      return a;
    } catch (error) {
      parseZodErrors(error.errors);
    }
  }
  // kako pisat commit poruke???

  // pogledat zod za validaciju

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
      {/* forma mora imat on submit */}
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
            onChange={handleUpdate}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <Button
          type="button"
          // type="submit"

          value={`ORDER NOW FOR €${
            formInfo.priority
              ? Math.round(total * 1.2).toFixed(2)
              : total.toFixed(2)
          }`}
          style="btn"
          handler={async (event) => {
            try {
              // jel moram pozivat checkFormValidity ili je donja linija dovoljna???
              if (checkFormValidity(formInfo) === undefined) return;
              const orderData = await fetchOrderPizza(event, formInfo);
              const orderId = orderData.data.id;
              navigate(`/order/${orderId}`);
              dispatch(clearCart());
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </form>
    </div>
  );
}

export default OrderNew;
