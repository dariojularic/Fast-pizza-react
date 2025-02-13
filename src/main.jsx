import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import store from "./store.js";
import Home from "#pages/home/Home.jsx";
import Menu from "#pages/menu/Menu.jsx";
import SharedLayout from "#layouts/SharedLayout.jsx";
import Cart from "./pages/cart/Cart.jsx";
import OrderNew from "./pages/order/ordernew/OrderNew.jsx";
import OrderId from "./pages/order/orderid/OrderId.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order",
        children: [
          {
            path: "new",
            element: <OrderNew />
          },
          {
            path: ":id",
            element: <OrderId />
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
