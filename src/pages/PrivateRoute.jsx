import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(
    (state) => state.user.status === "authenticated"
  );

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  //   if(isLoggedIn && )

  return children;
}

export default PrivateRoute;
