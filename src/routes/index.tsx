import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Auth/Profile";
import Registration from "../pages/Auth/Registration";
import AddEyeglass from "../pages/EyeglassesManagement/AddEyeglass";
import EyeglassDetails from "../pages/EyeglassesManagement/EyeglassDetails";
import Eyeglasses from "../pages/EyeglassesManagement/Eyeglasses";
import UpdateEyeglass from "../pages/EyeglassesManagement/UpdateEyeglass";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SaleDetails from "../pages/SalesManagement/SaleDetails";
import Sales from "../pages/SalesManagement/Sales";

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
          {
            path: "add",
            element: <AddEyeglass />,
          },
          {
            path: "update",
            element: <UpdateEyeglass />,
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
