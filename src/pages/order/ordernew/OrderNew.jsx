import "#pages/order/ordernew/OrderNew.css";
import OrderNewElement from "#pages/order/ordernew/components/OrderNewElement";
import Button from "#components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { totalPrice, clearCart } from "#cartSlice";
import { useState } from "react";
import { fetchOrderPizza } from "#api/index.js";
import { getAddress } from "#api";
import { z, ZodError } from "zod";
// kako pisat commit poruke???

const formSchema = z
  .object({
    address: z.string().min(4, {
      message: "Address is required and must contain at least 4 characters",
    }),
    customer: z.string().min(3, {
      message: "Name is required and must contain at least 3 characters",
    }),
    phone: z.string().min(6, {
      message: "Phone number is required and must contain at least 6 digits",
    }),
    position: z.string().optional(),
    priority: z.boolean(),
  })
  .required();

function OrderNew() {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { username } = useSelector((state) => state.user);
  const total = useSelector(totalPrice);

  const [formInfo, setFormInfo] = useState({
    address: "",
    cart: cart,
    customer: username,
    phone: "",
    position: "",
    priority: false,
  });

  const [modifiedError, setModifiedError] = useState({
    customer: {
      status: false,
      message: "",
    },
    phone: {
      status: false,
      message: "",
    },
    address: {
      status: false,
      message: "",
    },
  });

  function updateModifiedError(error) {
    error.errors.forEach((err) => {
      // console.log(err);
      setModifiedError((prev) => ({
        ...prev,
        [err.path[0]]: {
          status: true,
          message: err.message,
        },
      }));
    });
  }

  const navigate = useNavigate();

  function checkFormValidity(formData) {
    formSchema.parse(formData);
  }

  async function handleSubmit(event, formData) {
    event.preventDefault();
    try {
      checkFormValidity(formData);
      const orderData = await fetchOrderPizza(formData);
      const orderId = orderData.data.id;
      navigate(`/order/${orderId}`);
      dispatch(clearCart());
    } catch (error) {
      // console.log(error)
      if (error instanceof ZodError) {
        console.log("zod error");
        console.log("error.errors", error.errors);
        updateModifiedError(error);
        return;
        // const errors = parse errors from response
        // ideja 1 errors je array objekata sa poljima name i message, za svaki element u arrayu aktiviraj mi Error.name sa porukom .message iz tog objekta
        // ideja 2 napravit objekt u stateu koji odgovara onome sto ce vratit parse errors from response
        // provjerit - za svako polje koje postoji u ovom errors objektt koji vrati parse errors from response i u errors statu aktiviraj Error
      }
      if (error.data) {
        console.log("Empty cart");
        console.log(error.data.message);
        toast(error.data.message);
      } else {
        toast("Ups! Something went wrong...");
      }
    }
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
      <form
        className="order-form"
        onSubmit={(event) => handleSubmit(event, formInfo)}
      >
        <OrderNewElement
          id="customer"
          inputValue={formInfo.customer}
          labelValue="Name *"
          name="customer"
          handler={(event) => handleUpdate(event)}
        />
        {modifiedError.customer.status && (
          <p className="error-message">{modifiedError.customer.message}</p>
        )}
        <OrderNewElement
          id="phone"
          inputValue={formInfo.phone}
          labelValue="Phone Number *"
          name="phone"
          handler={(event) => handleUpdate(event)}
        />
        {modifiedError.phone.status && (
          <p className="error-message">{modifiedError.phone.message}</p>
        )}
        <div className="relative">
          <OrderNewElement
            id="address"
            inputValue={formInfo.address}
            labelValue="Address *"
            name="address"
            handler={(event) => handleUpdate(event)}
          />
          {modifiedError.address.status && (
            <p className="error-message">{modifiedError.address.message}</p>
          )}
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
          // type="button"
          type="submit"
          value={`ORDER NOW FOR €${
            formInfo.priority
              ? Math.round(total * 1.2).toFixed(2)
              : total.toFixed(2)
          }`}
          style="btn"
        />
      </form>
    </div>
  );
}

export default OrderNew;
