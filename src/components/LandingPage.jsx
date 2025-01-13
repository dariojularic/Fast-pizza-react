import "./LandingPage.css";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { addUserInputValue } from "../userSlice";
import Button from "./Button"
import { useState } from "react";

const LandingPage = () => {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch();
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
        <Input
          type="text"
          placeholder="Your full name"
          name="username"
          handler={(event) => {
            console.log(event.target.value);
            dispatch(addUserInputValue(event.target.value));
            setInputValue(event.target.value)
          }}
        />

        {inputValue !== "" && <Button />}
      </div>
    </div>
  );
};

export default LandingPage;
