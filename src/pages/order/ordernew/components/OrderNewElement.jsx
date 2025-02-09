import "./OrderNewElement.css";

function OrderNewElement({ id, inputValue, labelValue, name, handler }) {
  return (
    <div className="order-element">
      <div className="input-label-container">
        <label htmlFor={id} >{labelValue}</label>
        <input id={id}  type="text" name={name} className="order-input-field" defaultValue={inputValue} onChange={handler} autoComplete="on" required  />
      </div>
      <hr />
    </div>
  );
}

export default OrderNewElement;
