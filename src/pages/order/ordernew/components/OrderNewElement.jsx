import "./OrderNewElement.css";
import { useSelector } from "react-redux";

function OrderNewElement({ value, name, handler }) {
  const { username } = useSelector(store => store.user)
  const inputValue = (name === "customer") ? username : ""

  return (
    <div className="order-element">
      <div className="input-label-container">
        <label htmlFor={name}>{value}</label>
        <input type="text" name={name} className="order-input-field" defaultValue={inputValue} onChange={handler}  />
      </div>
      <hr />
    </div>
  );
}

export default OrderNewElement;
