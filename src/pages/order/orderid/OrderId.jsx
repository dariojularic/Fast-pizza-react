import { useEffect, useState } from "react";
import "./OrderId.css";
import { useParams } from "react-router-dom";
import Loader from "#layouts/loader/Loader.jsx";
import formatDistanceToNow from "date-fns"

function OrderId() {
  const [orderStatus, setOrderStatus] = useState({});
  const [orderStatusReady, setOrderStatusReady] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://react-fast-pizza-api.onrender.com/api/order/${params.id}`
        );
        const data = await response.json();
        setOrderStatus(data.data);
        setOrderStatusReady(true);
        console.log(data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  console.log(orderStatus);

  if (orderStatusReady === false) return <Loader />;

  return (
    <div className="order-id">
      <div className="order-status">
        <h3>Order #{orderStatus.id} status</h3>
        <div className="priority-status-container">
          {orderStatus.priority && <p className="priority-paragraph">PRIORITY</p>}
          <p className="status-paragraph">{orderStatus.status}</p>
        </div>
      </div>

      <div className="delivery-container">
        <p>Only 20 minutes left 😀</p>
        <p>Estimated delivery: {orderStatus.estimatedDelivery}</p>
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
        <p>Price pizza: €20</p>
        <p>Price priority: €20</p>
        <p>To pay on delivery: €20</p>
      </div>
    </div>
  );
}

export default OrderId;
