import "./LandingPage.css";
import Input from "./Input"

const LandingPage = () => {
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
        <Input type="text" placeholder="Your full name" name="username" />
      </div>
    </div>
  );
};

export default LandingPage;
