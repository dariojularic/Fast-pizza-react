import "./Navbar.css";
import Input from "#components/Input";
import { useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {
  const { username } = useSelector((store) => store.user);
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()
  const navigateTo = `/order/${inputValue}`

  function submitHandler(event) {
    event.preventDefault()
    navigate(navigateTo)
  }

  return (
    <nav>
      <Link className="navbar-link" to="/">
        <h2>Fast Pizza Co.</h2>
      </Link>
      <form className="navbar-form" onSubmit={submitHandler}>
        <Input type="text" placeholder="Search order #" name="order" handler={(event) => setInputValue(event.target.value)} />
      </form>
      {username === "" ? null : <h3>{username.toUpperCase()}</h3>}
    </nav>
  );
};

export default Navbar;
