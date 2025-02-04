import "./Footer.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// font awesome icone koristit kao i prije ili react opciju?
// jel moram koristit button za link ili mogu div??
// kako stavit iconu sa font awesome, normalno ili react verziju

function Footer() {
  const { cart } = useSelector((store) => store.cart);
  const uniqueIds = [];
  // jel mogu imat ovu let varijablu za totalPrice???
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.unitPrice * item.amount;
    if (uniqueIds.includes(item.id)) return;
    else uniqueIds.push(item.id);
  });

  return (
    <footer>
      <div className="cart-info">
        <p className="unique-ids">{uniqueIds.length}</p>
        <p className="total-price">€{totalPrice.toFixed(2)}</p>
      </div>
      <Link className="open-cart" to="/cart">
        OPEN CART
      </Link>
    </footer>
  );
}
// <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
export default Footer;
