import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { getUserId } from "../services/userSlice";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.user.status === "authenticated"
  );
  const userId = useSelector(getUserId);

  const queryClient = useQueryClient();

  const cachedProfile = queryClient.getQueryData(["profiles", userId]);

  const cachedCV = queryClient.getQueryData(["cv", cachedProfile?.id]);

  let hasCV = false;

  if (cachedCV && cachedCV.length !== 0) {
    hasCV = true;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasCV && window.location.pathname !== "/cvekle") {
    return <Navigate to="/cvekle" />;
  }

  return children;
}

export default ProtectedRoute;
