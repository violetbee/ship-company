import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserId } from "../services/userSlice";
import { getCV, getProfile } from "../services/getAPI";
import Spinner from "../ui/Spinner";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.user.status === "authenticated"
  );
  const userId = useSelector(getUserId);

  const queryClient = useQueryClient();
  const cachedSession = queryClient.getQueryData(["session"]);

  const { isLoading: profileLoading, data: profile } = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId && isAuthenticated,
  });

  const { isLoading: cvLoading, data: cv } = useQuery({
    queryKey: ["cv", profile?.id],
    queryFn: () => getCV(userId),
    enabled: !!userId && isAuthenticated,
  });

  console.log("CV:", cv);

  if (profileLoading || cvLoading) {
    return <Spinner />;
  }

  // Check if cv object exists and has properties
  const hasCV = cv && Object.keys(cv).length > 0;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasCV && window.location.pathname !== "/cvekle") {
    return <Navigate to="/cvekle" />;
  }

  return children;
}

export default ProtectedRoute;
