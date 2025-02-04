import "#pages/cart/Cart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import Button from "#components/Button";
import { capitalizeName } from "../../userSlice";
import { clearCart } from "../../cartSlice";
// import { useNavigate } from "react-router-dom";

function Cart() {
  const { username } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  // console.log(username);

  // const navigate = useNavigate();
  // const handleBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="container">
      <Link className="back-button" to="/menu">
        <FontAwesomeIcon className="arrow-icon" icon={faArrowLeft} />
        Back to menu
      </Link>
      {/* username mora imat prvo veliko slovo, jel to bolje pomocu js ili css??? */}
      <h2 className="cart-username"> Your cart, {username}</h2>
      <div className="order">
        {cart.map((pizza) => {
          return <CartItem key={pizza.id} {...pizza} />;
        })}
        {/* <p></p> */}
      </div>
      <div className="cart-buttons">
        <Button value="ORDER PIZZAS" type="button" style="btn" />
        <Button value="CLEAR CART" type="button" style="btn gray" handler={() => dispatch(clearCart())} />
      </div>
    </div>
  );
}

export default Cart;
