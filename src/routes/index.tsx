import App from "@/App";
import Login from "@/pages/Auth/Login";
import Profile from "@/pages/Auth/Profile";
import Registration from "@/pages/Auth/Registration";
import EyeglassDetails from "@/pages/EyeglassesManagement/EyeglassDetails";
import Eyeglasses from "@/pages/EyeglassesManagement/Eyeglasses";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import SaleDetails from "@/pages/SalesManagement/SaleDetails";
import Sales from "@/pages/SalesManagement/Sales";
import { createBrowserRouter } from "react-router-dom";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "my-profile",
        element: <Profile />,
      },
      {
        path: "eyeglasses",
        children: [
          {
            path: "",
            element: <Eyeglasses />,
          },
          {
            path: ":id",
            element: <EyeglassDetails />,
          },
        ],
      },
      {
        path: "sales",
        children: [
          {
            path: "",
            element: <Sales />,
          },
          {
            path: ":id",
            element: <SaleDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default route;
