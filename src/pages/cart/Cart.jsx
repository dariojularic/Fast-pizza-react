import "#pages/cart/Cart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import Button from "#components/Button";
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
      <h2>Your cart, {username}</h2>
      <div className="order">
        {cart.map((pizza) => {
          return <CartItem key={pizza.id} {...pizza} />;
        })}
        {/* <p></p> */}
      </div>
      <Button value="ORDER PIZZAS" type="button" style="btn" />
      <Button value="CLEAR CART" type="button" style="btn gray" />
    </div>
  );
}

export default Cart;
