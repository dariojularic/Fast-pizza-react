import Input from "#components/Input";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { username } = useSelector((store) => store.user);
  return (
    <nav>
      <Link className="navbar-link" to="/">
        <h2>Fast Pizza Co</h2>
      </Link>
      <Input type="text" placeholder="Search order #" name="order" />
      {username === "" ? null : <h3>{username.toUpperCase()}</h3>}
    </nav>
  );
};

export default Navbar;
