import "./Button.css";

const Button = ({ style, type, value, handler }) => {
  if (type === "submit") {
    return (
      <button className={style} type={type}>
        {value}
      </button>
    );
  }

  return (
    <button className={style} type={type} onClick={handler}>
      {value}
    </button>
  );
};

export default Button;
