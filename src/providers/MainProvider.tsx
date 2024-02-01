import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { persistor, store } from "../redux/store";
import route from "../routes";

const MainProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <RouterProvider router={route}></RouterProvider>
        </HelmetProvider>
        <Toaster richColors />
      </PersistGate>
    </Provider>
  );
};

export default MainProvider;
