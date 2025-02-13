import "./Button.css";

const Button = ({ style, type, value, handler }) => {
  const doNothing = () => {};
  if (type === "submit") {
    return (
      <button
        className={style}
        type={type}
      >
        {value}
      </button>
    );
  }

  return (
    <button
      className={style}
      type={type}
      onClick={type === "submit" ? doNothing : handler}
    >
      {value}
    </button>
  );
};

export default Button;
