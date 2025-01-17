import Input from "./Input"
import "./Navbar.css"
import { useSelector } from "react-redux"

const Navbar = () => {
  const { username } = useSelector(store => store.user)
  // console.log(username)
  return (
    <nav>
      <h2>Fast Pizza Co</h2>
      <Input type="text" placeholder="Search order #" name="order"  />
      {username === "" ? null : <h3>{username}</h3>}
    </nav>
  )
}

export default Navbar;
