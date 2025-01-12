import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="headers">
        <h1>The best pizza <br></br><span className="header-span" >Straight out of the oven, straight to you</span></h1>
        {/* <h2>Straight out of the oven, straight to you</h2> */}
      </div>

      <div className="user-input-container">
        <h3>👋 Welcome! Please start by telling us your name: </h3>
        <input className="username-input" type="text" placeholder="Your full name" name="username"  />
      </div>
    </div>
  );
};

export default LandingPage;
