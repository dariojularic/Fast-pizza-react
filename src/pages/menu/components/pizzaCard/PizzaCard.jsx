import Button from "#components/Button";
import "./PizzaCard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseAmount,
  decreaseAmount,
  removeFromCart,
} from "../../../../cartSlice";
import { useState } from "react";

const PizzaCard = ({
  id,
  name,
  ingredients,
  soldOut,
  price,
  image,
  handler,
}) => {
  const dispatch = useDispatch();
  const style = soldOut ? "pizza-image gray" : "pizza-image";
  const { cart } = useSelector((store) => store.cart);
  const [amount, setAmount] = useState(0)

  // kako prikazat amount?
  // stavit useState za amount
  // const selectedPizza = cart.filter((pizza) => pizza.id === id);

  // koristit funkciju find - maknut useState, sve ide preko globalnog state

  return (
    <li>
      <img className={style} src={image} alt="" />
      <div className="pizza-info">
        <div className="name-ingredients-container">
          <h4 className="pizza-name">{name}</h4>
          <p className="pizza-ingredients">{ingredients.join(", ")}</p>
        </div>

        {cart.some((pizza) => pizza.id === id) ? (
          <div className="buttons-container">
            <div className="change-amount-container">
              <Button
                style="btn change-amount-btn"
                value="-"
                type="button"
                handler={() => {
                  dispatch(decreaseAmount(id));
                  setAmount(prev => prev - 1)
                }}
              />
              {/* amount */}
              {/* <p className="amount">{selectedPizza[0].amount}</p> */}
              <p className="amount">{amount}</p>
              <Button
                style="btn change-amount-btn"
                value="+"
                type="button"
                handler={() => {
                  dispatch(increaseAmount(id));
                  // provjerit jel ovo ok. prvo povecam global state a onda state od PizzaCarda
                  setAmount(prev => prev + 1)
                }}
              />
              <Button
                style="btn delete-btn"
                value="DELETE"
                type="button"
                handler={() => {
                  dispatch(removeFromCart(id));
                }}
              />
            </div>
            <p className="pizza-price">{price.toFixed(2)}</p>
          </div>
        ) : (
          <div className="price-button-container">
            <p className="pizza-price">
              {soldOut ? "SOLD OUT" : "€" + price.toFixed(2)}
            </p>
            {soldOut ? null : (
              <Button
                style="btn add-btn"
                value="ADD TO CART"
                type="button"
                handler={() => {
                  handler()
                  dispatch(increaseAmount(id))
                  setAmount(prev => prev + 1)
                  // provjerit jel ovo gore ok. znaci prvo dodam pizzu u cart i onda povecam amount za 1 tj sa 0 na 1
                }}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default PizzaCard;
