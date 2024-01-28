import MainLayout from "./components/layout/MainLayout";
import RouteProtector from "./providers/RouteProtector";

const App = () => {
  return (
    <RouteProtector>
      <MainLayout />
    </RouteProtector>
  );
};

export default App;
