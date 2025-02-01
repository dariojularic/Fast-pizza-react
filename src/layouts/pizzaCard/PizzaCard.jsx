import Button from "../../components/Button";
import "./PizzaCard.css";

const PizzaCard = ({ name, ingredients, soldOut, price, image }) => {
  const style = soldOut ? "pizza-image gray" : "pizza-image";

  return (
    <li>
      <div className="pizza-details">
        <img className={style} src={image} alt="" />
        <div className="pizza-info">
          <div className="name-ingredients">
            <h4 className="pizza-name">{name}</h4>
            <p className="pizza-ingredients">{ingredients.join(", ")}</p>
          </div>
          <p className="pizza-price">
            {soldOut ? "SOLD OUT" : "€" + price + ".00"}
          </p>
        </div>
      </div>
      {soldOut ? null : (
        <div className="button-container">
          <Button style="btn add-btn" value="ADD TO CART" type="button" />
        </div>
      )}
    </li>
  );
};

export default PizzaCard;

// 08004100104
