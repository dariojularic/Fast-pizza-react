import "./OrderId.css";
import Loader from "#layouts/loader/Loader.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";
import { calculateTotal } from "#helpers";
import { getOrder } from "#api/index.js";

function OrderId() {
  const [order, setOrder] = useState({});
  const [orderReady, setOrderReady] = useState(false);
  const params = useParams();


  useEffect(() => {
    getOrder(params.id).then((orderData) => {
      console.log(orderData);
      setOrder(orderData.data);
      setOrderReady(true);
    });
  }, []);

  if (orderReady === false) return <Loader />;

  return (
    <div className="order-id">
      <div className="order-status">
        <h3>Order #{order.id} status</h3>
        <div className="priority-status-container">
          {order.priority && <p className="priority-paragraph">PRIORITY</p>}
          <p className="status-paragraph">{order.status.toUpperCase()}</p>
        </div>
      </div>

      <div className="delivery-container">
        <p className="until-delivery">
          Only {formatDistanceToNow(new Date(order.estimatedDelivery))} left 😀
        </p>
        <p className="delivery-time">
          (Estimated delivery:{" "}
          {format(new Date(order.estimatedDelivery), "MMM d, hh:mm a")})
        </p>
      </div>

      <div className="order-container">
        {order.cart.map((pizza) => {
          return (
            <div key={pizza.id}>
              <div className="pizza-container">
                <p className="num-of-pizzas">
                  {pizza.quantity} x {pizza.name}
                </p>
                <p className="pizza-price">€{pizza.totalPrice.toFixed(2)}</p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>

      <div className="price-container">
        <p>Price pizza: €{calculateTotal(order.cart)}</p>
        {order.priority && <p>Price priority: {order.priorityPrice}</p>}
        <p className="amount-to-pay">
          To pay on delivery: €
          {calculateTotal(order.cart) + order.priorityPrice}
        </p>
      </div>
    </div>
  );
}

export default OrderId;
