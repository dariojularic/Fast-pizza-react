import { useEffect, useState } from "react";
import "./OrderId.css";
import { useParams } from "react-router-dom";
import Loader from "#layouts/loader/Loader.jsx";
import { formatDistanceToNow, format } from "date-fns";
import { totalPrice } from "../../../cartSlice";
import { useSelector } from "react-redux";

function OrderId() {
  const [orderStatus, setOrderStatus] = useState({});
  const [orderStatusReady, setOrderStatusReady] = useState(false);
  const params = useParams();
  const total = useSelector(totalPrice)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://react-fast-pizza-api.onrender.com/api/order/${params.id}`
        );
        const data = await response.json();
        setOrderStatus(data.data);
        setOrderStatusReady(true);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  if (orderStatusReady === false) return <Loader />;

  return (
    <div className="order-id">
      <div className="order-status">
        <h3>Order #{orderStatus.id} status</h3>
        <div className="priority-status-container">
          {orderStatus.priority && (
            <p className="priority-paragraph">PRIORITY</p>
          )}
          <p className="status-paragraph">{orderStatus.status.toUpperCase()}</p>
        </div>
      </div>

      <div className="delivery-container">
        <p className="until-delivery">Only {formatDistanceToNow(new Date(orderStatus.estimatedDelivery))} left 😀</p>
        <p className="delivery-time">(Estimated delivery: {format( new Date(orderStatus.estimatedDelivery), 'MMM d, hh:mm a')})</p>
      </div>

      <div className="order-container">
        {orderStatus.cart.map((pizza) => {
          return (
            <>
              <div key={pizza.id} className="pizza-container">
                <p className="num-of-pizzas">
                  {pizza.quantity} x {pizza.name}
                </p>
                <p className="pizza-price">€{pizza.totalPrice.toFixed(2)}</p>
              </div>
              <hr />
            </>
          );
        })}
      </div>

      <div className="price-container">
        <p>Price pizza: €{total}</p>
        {orderStatus.priority && <p>Price priority: {orderStatus.priorityPrice}</p>}
        <p className="amount-to-pay">To pay on delivery: €{total}</p>
      </div>
    </div>
  );
}

export default OrderId;
