import "./Button.css"

const Button = ({type, value, handler}) => {
  return <button className="btn" type={type} onClick={handler} >{value}</button>;
};

export default Button;
