import "./CartItem.css";
import Button from "#components/Button.jsx";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "#root/src/cartSlice";
import { useDispatch } from "react-redux";

function CartItem({ id, name, unitPrice, quantity }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="item-container">
        <p>
          {quantity} x {name}
        </p>

        <div className="cart-item-buttons">
          <p className="price-per-pizza">€{unitPrice}</p>
          <Button
            type="button"
            value="-"
            style="btn change-amount-btn"
            handler={() => dispatch(decreaseAmount(id))}
          />
          <p>{quantity}</p>
          <Button
            type="button"
            value="+"
            style="btn change-amount-btn"
            handler={() => dispatch(increaseAmount(id))}
          />
          <Button
            type="button"
            value="DELETE"
            style="btn delete-btn"
            handler={() => dispatch(removeFromCart(id))}
          />
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
