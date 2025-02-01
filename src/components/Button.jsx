import "./Button.css"

const Button = ({style, type, value, handler}) => {
  return <button className={style} type={type} onClick={handler} >{value}</button>;
};

export default Button;
