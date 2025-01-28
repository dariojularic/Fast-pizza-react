import Button from "../../components/Button";
import "./PizzaCard.css";

const PizzaCard = ({ name, ingredients, soldOut, price, image }) => {
  return (
    <li>
      <div className="pizza-details">
        <img src={image} alt="" />
        <div className="pizza-info">
          <h4 className="pizza-name">{name}</h4>
          <p className="pizza-ingredients">
            {ingredients.map((ingredient) => {
              return ingredient;
            })}
          </p>
          <p className="pizza-price">{price}</p>
        </div>
      </div>
      <Button />
    </li>
  );
};

export default PizzaCard;
