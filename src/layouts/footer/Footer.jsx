// import store from "../../store";
import "./Footer.css";
import { useSelector } from "react-redux";

// font awesome icone koristit kao i prije ili react opciju?

function Footer() {
  const { cart } = useSelector((store) => store.cart);
  const uniqueIds = [];
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
      <div className="cart-button">OPEN CART</div>
    </footer>
  );
}

export default Footer;
