import "./OrderNewElement.css";
import { useSelector } from "react-redux";

function OrderNewElement({ id, value, name, handler }) {
  const { username } = useSelector(store => store.user)
  const inputValue = (name === "customer") ? username : ""

  return (
    <div className="order-element">
      <div className="input-label-container">
        <label for={id} htmlFor={name}>{value}</label>
        <input id={id}  type="text" name={name} className="order-input-field" defaultValue={inputValue} onChange={handler} autoComplete="on"  />
      </div>
      <hr />
    </div>
  );
}

export default OrderNewElement;
