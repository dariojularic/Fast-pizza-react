const Input = ({ type, placeholder, name }) => {
  const classVariation = name === "username" ? "username-input" : "order-input"
  return <input type={type} placeholder={placeholder} name={name} className={classVariation} autoComplete={(type === "text").toString()} />;
};

export default Input;
