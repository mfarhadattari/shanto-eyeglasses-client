import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "../redux/store";
import route from "../routes";

const MainProvider = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={route}></RouterProvider>
    </Provider>
  );
};

export default MainProvider;
