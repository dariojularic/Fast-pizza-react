import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
