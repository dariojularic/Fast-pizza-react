import Button from "../../components/Button";
import "./PizzaCard.css";

const PizzaCard = ({ name, ingredients, soldOut, price, image }) => {
  const style = soldOut ? "pizza-image gray" : "pizza-image";

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
            {soldOut ? "SOLD OUT" : "€" + price + ".00"}
          </p>
          {soldOut ? null : (
            <div className="button-container">
              <Button style="btn add-btn" value="ADD TO CART" type="button" />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default PizzaCard;

// 08004100104
