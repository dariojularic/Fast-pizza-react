import "./CartItem";
import Button from "#components/Button.jsx";

function CartItem({id, name, unitPrice, amount}) {
  return (
    <>
      <div className="item-container">
        <p>{amount} x {name}</p>

        <div className="cart-item-buttons">
          <p className="price-per-pizza">€{unitPrice}</p>
          <Button type="button" value="-" style="btn change-amount-btn" />
          <p>{amount}</p>
          <Button type="button" value="+" style="btn change-amount-btn" />
          <Button type="button" value="DELETE" style="btn delete-btn" />
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
