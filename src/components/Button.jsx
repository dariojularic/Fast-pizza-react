import "./Button.css"

const Button = ({type, value}) => {
  return <button className="btn" type={type} >{value}</button>;
};

export default Button;
