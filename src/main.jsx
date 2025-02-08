import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        // element: <Order />,
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

// order ruta sa dvije child rute- jedna je new a druga je id

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
