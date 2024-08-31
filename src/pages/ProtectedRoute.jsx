import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../services/userSlice";
import { supabase } from "../supabase/supabase";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.user.status === "authenticated"
  );
  const userId = useSelector(getUserId);

  // Fetch profiles and find the profile ID
  const { data: profiles, error: profilesError } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id");
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: isAuthenticated, // only fetch if authenticated
  });

  const profileId = profiles?.find((profile) => profile.user_id === userId)?.id;

  // Fetch CVs based on the profile ID
  const { data: cvs, error: cvsError } = useQuery({
    queryKey: ["cvs", profileId],
    queryFn: async () => {
      if (!profileId) return [];
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("profile_id", profileId);
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!profileId && isAuthenticated,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (profilesError || cvsError) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  const hasCV = cvs?.length > 0;

  if (!hasCV) {
    return <Navigate to="/cvekle" />;
  }

  return children;
}

export default ProtectedRoute;
