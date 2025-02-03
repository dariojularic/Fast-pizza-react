import { Outlet } from "react-router-dom";
import Navbar from "#layouts/navbar/Navbar";
import Footer from "#layouts/footer/Footer";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default SharedLayout;
