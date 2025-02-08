import "./OrderId.css"

// pogledat hook useParams iz react routera
// samo useState

function OrderId() {
  return (
    <div className="order-id">
      <h1>order ID</h1>
      <div className="order-status">
        <p>Order *** status</p>
        <p>Preparing status</p>
      </div>

      <div className="delivery-container">
        <p>Only 20 minutes left 😀</p>
        <p>Estimated delivery:</p>
      </div>

      <div className="order-container">
        <div className="pizza-container">
          <p className="num-of-pizzas"></p>
          <p className="pizza-price"></p>
        </div>
      </div>

      <div className="price-container">
        <p>Price pizza: €20</p>
        <p>To pay on delivery: €20</p>
      </div>
    </div>
  );
}

export default OrderId;
