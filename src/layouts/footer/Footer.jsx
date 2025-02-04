import "./Footer.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { totalPrice } from "../../cartSlice";

function Footer() {
  // jel mi ovdje uopce treba ovaj useSelector i parametar za total price ili to prebacim u cartSlice???
  const { cart } = useSelector((store) => store.cart);
  const total = totalPrice(cart);

  return (
    <footer>
      <div className="cart-info">
        <p className="unique-ids">{total.uniqueIds.length}</p>{" "}
        <p className="total-price">€{total.totalPrice.toFixed(2)}</p>
      </div>
      <Link className="open-cart" to="/cart">
        OPEN CART{" "}
        <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
      </Link>
    </footer>
  );
}
export default Footer;
