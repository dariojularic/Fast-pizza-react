import "#pages/cart/Cart.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  return(
    <div className="container">
      <Link>

        <FontAwesomeIcon className="arrow-icon" icon={faArrowLeft} />
      </Link>
      <h2>Cart</h2>
    </div>
  )
}

export default Cart;
