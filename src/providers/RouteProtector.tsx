import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const RouteProtector = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);

  // redirect handling
  const location = useLocation();

  if (user) {
    return children;
  } else {
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ from: location.pathname }}
      />
    );
  }
};

export default RouteProtector;
