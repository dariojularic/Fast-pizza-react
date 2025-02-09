import "./Footer.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { totalPrice } from "#cartSlice";
import { numOfDiffPizzas } from "#cartSlice";

function Footer() {
  const total = useSelector(totalPrice);
  const numOfPizzas = useSelector(numOfDiffPizzas);

  return (
    <footer>
      <div className="cart-info">
        <p className="unique-ids">{numOfPizzas}</p>{" "}
        <p className="total-price">€{total.toFixed(2)}</p>
      </div>
      <Link className="open-cart" to="/cart">
        OPEN CART <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
      </Link>
    </footer>
  );
}
export default Footer;
