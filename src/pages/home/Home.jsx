import "./Home.css";
import Input from "#components/Input.jsx";
import Button from "#components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "#userSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { username } = useSelector((state) => state.user);

  const [inputValue, setInputValue] = useState("");

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
          <form
            className="add-user-form"
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(addUser(inputValue));
              navigate("/menu");
            }}
          >
            <Input
              type="text"
              placeholder="Your full name"
              name="username"
              handler={(event) => {
                setInputValue(event.target.value);
              }}
            />

            {inputValue !== "" && (
              <Button
                style="btn"
                type="submit"
                value="Submit name"
              />
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
