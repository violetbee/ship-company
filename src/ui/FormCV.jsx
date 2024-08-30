import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCV } from "../services/postAPI";
import { useNavigate } from "react-router";
import { supabase } from "../supabase/supabase";

function CvForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const userId = useSelector(getUserId);
  const navigate = useNavigate();

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
    onSuccess: () => navigate("/"),
  });

  const onSubmit = async (data) => {
    if (profilesError || cvsError) {
      alert("Error fetching data. Please try again later.");
      return;
    }

    const existingCV = cvs?.some((cv) => cv.profile_id === profileId);
    console.log("Existing CV Check:", existingCV);

    if (existingCV) {
      alert("You already have a CV. Please update your existing CV.");
      return;
    }

    mutate(data);
  };

  if (profilesLoading || cvsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container flex flex-col space-y-8 p-8 bg-blue-500"
    >
      {/* Profile ID Field */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Profile ID"
          hidden
          value={profileId || ""}
          {...register("profile_id", { required: "Profile ID gerekli" })}
          className="w-full"
        />
        {errors.profile_id && (
          <p className="mt-2 text-red-600">{errors.profile_id.message}</p>
        )}
      </div>

      {/* Details Field */}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Details"
          {...register("details", { required: "Details gerekli" })}
          className="w-full"
        />
        {errors.details && (
          <p className="mt-2 text-red-600">{errors.details.message}</p>
        )}
      </div>

      <Button type="submit" className="flex gap-2 mt-4" variant="outline">
        Gönder
      </Button>
    </form>
  );
}

export default CvForm;
