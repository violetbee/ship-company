import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCV } from "../services/postAPI";
import { useNavigate } from "react-router";
import { supabase } from "../supabase/supabase";

function CvForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userId = useSelector(getUserId);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Get the query client

  // Fetch profiles and find the profile ID
  const {
    data: profiles,
    error: profilesError,
    isLoading: profilesLoading,
  } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const profileId = profiles?.find((profile) => profile.user_id === userId)?.id;

  // Fetch CVs based on the profile ID
  const {
    data: cvs,
    error: cvsError,
    isLoading: cvsLoading,
  } = useQuery({
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
    enabled: !!profileId,
  });

  // Handle form submission
  const { mutate } = useMutation({
    mutationFn: createCV,
    onSuccess: () => {
      queryClient.invalidateQueries(["cvs", profileId]); // Invalidate the query for cvs
      navigate("/"); // Navigate to the desired page
    },
  });

  const onSubmit = async (data) => {
    if (profilesError || cvsError) {
      alert("Error fetching data. Please try again later.");
      return;
    }

    const existingCV = cvs?.some((cv) => cv.profile_id === profileId);

    if (existingCV) {
      alert("You already have a CV. Please update your existing CV.");
      return;
    }

    mutate({ ...data, profile_id: profileId });
  };

  if (profilesLoading || cvsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto max-w-2xl p-8 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create Your CV
      </h2>

      <div className="space-y-4">
        {/* Profile ID Field */}
        <input
          type="text"
          placeholder="Profile ID"
          hidden
          value={profileId || ""}
          {...register("profile_id", { required: "Profile ID is required" })}
        />

        {/* Details Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details
          </label>
          <Input
            type="text"
            placeholder="Enter your CV details"
            {...register("details", { required: "Details are required" })}
            className="w-full border-gray-300 rounded-lg shadow-sm"
          />
          {errors.details && (
            <p className="mt-2 text-sm text-red-600">
              {errors.details.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default CvForm;
