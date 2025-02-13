import "./Input.css";

const Input = ({ type, placeholder, name, handler }) => {
  const classVariation = name === "username" ? "username-input" : "order-input";
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className={classVariation}
      autoComplete={(type === "text").toString()}
      onChange={handler}
    />
  );
};

export default Input;
