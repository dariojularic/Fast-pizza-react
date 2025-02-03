import Button from "#components/Button";
import "./PizzaCard.css";
import { useSelector } from "react-redux";

const PizzaCard = ({
  id,
  name,
  ingredients,
  soldOut,
  price,
  image,
  handler,
}) => {
  const style = soldOut ? "pizza-image gray" : "pizza-image";
  const { cart } = useSelector((store) => store.cart);
  console.log(cart);

  return (
    <li>
      <img className={style} src={image} alt="" />
      <div className="pizza-info">
        <div className="name-ingredients-container">
          <h4 className="pizza-name">{name}</h4>
          <p className="pizza-ingredients">{ingredients.join(", ")}</p>
        </div>

        <div className="price-button-container">
          <p className="pizza-price">
            {soldOut ? "SOLD OUT" : "€" + price.toFixed(2)}
          </p>
          {soldOut ? null : (
            <Button
              style="btn add-btn"
              value="ADD TO CART"
              type="button"
              handler={() => handler()}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default PizzaCard;

// 08004100104
