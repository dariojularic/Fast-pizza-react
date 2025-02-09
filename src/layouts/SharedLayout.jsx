import Navbar from "#layouts/navbar/Navbar";
import Footer from "#layouts/footer/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SharedLayout = () => {
  const { cart } = useSelector((store) => store.cart);
  return (
    <>
      <Navbar />
      <Outlet />
      {
        (cart.length > 0) && <Footer />
      }
    </>
  );
};

export default SharedLayout;
