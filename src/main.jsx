import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Menu from "./pages/menu/Menu.jsx";
import SharedLayout from "./layouts/SharedLayout.jsx";

// vidjet kako dodat path alias
// primjer - import home from "#root/pages/home/index.jsx"
// #root je root projekta ili src folder
// fetch api
// render list
//
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
