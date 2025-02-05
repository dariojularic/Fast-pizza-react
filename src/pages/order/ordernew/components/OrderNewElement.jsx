import "./OrderNewElement.css";
import { useSelector } from "react-redux";

function OrderNewElement({ value, name }) {
  const { username } = useSelector(store => store.user)
  const inputValue = (name === "first-name") ? username : ""

  return (
    <div className="order-element">
      <div className="input-label-container">
        <label htmlFor={name}>{value}</label>
        <input type="text" name={name} className="order-input-field" defaultValue={inputValue}  />
      </div>
      <hr />
    </div>
  );
}

export default OrderNewElement;
