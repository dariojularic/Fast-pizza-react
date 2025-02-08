import "./Home.css";
import Input from "#components/Input.jsx";
import Button from "#components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addUser } from "../../userSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);

  // if (username !== "") return <div className="btn">ORDER PIZZA</div>;

  return (
    <div className="landing-page">
      <div className="headers">
        <h1>
          The best pizza <br></br>
          <span className="header-span">
            Straight out of the oven, straight to you
          </span>
        </h1>
      </div>

      {username !== "" ? (
        <Link to="/menu" className="btn link username">
          CONTINUE ORDERING, {username.toUpperCase()}
        </Link>
      ) : (
        <div className="user-input-container">
          <h3>👋 Welcome! Please start by telling us your name: </h3>
          <form className="add-user-form" action="">
            <Input
              type="text"
              placeholder="Your full name"
              name="username"
              handler={(event) => {
                setInputValue(event.target.value);
              }}
            />

            {inputValue !== "" && (
              <Link to="/menu">
                <Button
                  style="btn"
                  type="submit"
                  value="Submit name"
                  handler={() => {
                    dispatch(addUser(inputValue));
                  }}
                />
              </Link>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
