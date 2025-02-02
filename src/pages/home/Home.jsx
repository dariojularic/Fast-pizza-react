import "./Home.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { addUser } from "../../userSlice";
import { useDispatch } from "react-redux";

// folder layouts
// --navigation
// --footer

// folder components
// button.jsx
// input.jsx
// generalno gradivne komponente neovisne o jednom dijelu stranice specificno

// pages
// --home
// ----components
// ----menu.jsx
// --hooks
// --useBlaBla.jsx
// --index.jsx

const Home = () => {
  const [inputValue, setInputValue] = useState("");
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
    </div>
  );
};

export default Home;
