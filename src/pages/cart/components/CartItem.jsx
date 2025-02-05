import "./CartItem.css";
import Button from "#components/Button.jsx";
import { removeFromCart, increaseAmount, decreaseAmount } from "#root/src/cartSlice"
import { useDispatch } from "react-redux";

// napravit poseban file helpers.js i tamo stavit pomocne funkcije kao capitalize()

function CartItem({id, name, unitPrice, amount}) {
  const dispatch = useDispatch()
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <div className="item-container">
        <p>{amount} x {capitalizedName}</p>

        <div className="cart-item-buttons">
          <p className="price-per-pizza">€{unitPrice}</p>
          <Button type="button" value="-" style="btn change-amount-btn" handler={() => dispatch(decreaseAmount(id))} />
          <p>{amount}</p>
          <Button type="button" value="+" style="btn change-amount-btn" handler={() => dispatch(increaseAmount(id))} />
          <Button type="button" value="DELETE" style="btn delete-btn" handler={() => dispatch(removeFromCart(id))} />
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
