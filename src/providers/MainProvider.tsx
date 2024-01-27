import route from "@/routes";
import { RouterProvider } from "react-router-dom";

const MainProvider = () => {
  return <RouterProvider router={route}></RouterProvider>;
};

export default MainProvider;
