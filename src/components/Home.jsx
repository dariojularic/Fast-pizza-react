import "./Home.css";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addUser } from "../userSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch()

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
              <Button type="submit" value="Submit name" handler={() => dispatch(addUser(inputValue))} />
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
