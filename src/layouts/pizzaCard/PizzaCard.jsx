import Button from "../../components/Button";
import "./PizzaCard.css";

const PizzaCard = ({ name, ingredients, soldOut, price, image }) => {
  return (
    <li>
      <div className="pizza-details">
        <img className="pizza-image" src={image} alt="" />
        <div className="pizza-info">
          <div className="name-ingredients">
            <h4 className="pizza-name">{name}</h4>
            <p className="pizza-ingredients">{ingredients.join(", ")}</p>
          </div>
          <p className="pizza-price">€{price}.00</p>
        </div>
      </div>
      <div className="button-container">
        <Button value="ADD TO CART" type="button" />
      </div>
    </li>
  );
};

export default PizzaCard;

// 08004100104
