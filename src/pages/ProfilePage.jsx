import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { getCV, getProfile } from "../services/getAPI";
import { Button } from "../ui/Button";
import { updateCV, updateProfile } from "../services/postAPI";

function ProfilePage() {
  const { register, handleSubmit } = useForm();
  const userId = useSelector(getUserId);
  const queryClient = useQueryClient();

  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
  });

  const {
    data: cvData,
    error: cvError,
    isLoading: cvLoading,
  } = useQuery({
    queryKey: ["cv", userId],
    queryFn: () => getCV(userId),
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", userId]);
    },
    onError: (error) => {
      console.error("Profile update error:", error);
    },
  });

  const updateCVMutation = useMutation({
    mutationFn: updateCV,
    onSuccess: () => {
      queryClient.invalidateQueries(["cv", userId]);
    },
    onError: (error) => {
      console.error("CV update error:", error);
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);

    if (profile?.id) {
      if (data.name || data.surname) {
        console.log("Updating profile with:", {
          profileId: profile.id,
          ...data,
        });
        updateProfileMutation.mutate({
          profileId: profile.id,
          first_name: data.name,
          second_name: data.surname,
        });
      }

      if (data.cvDetails) {
        console.log("Updating CV with:", {
          profileId: profile.id,
          cvDetails: data.cvDetails,
        });
        updateCVMutation.mutate({
          profileId: profile.id,
          cvDetails: data.cvDetails,
        });
      }
    } else {
      console.error("Profile ID is not available");
    }
  };

  if (profileLoading || cvLoading) return <div>Loading...</div>;
  if (profileError || cvError)
    return <div>Error: {profileError?.message || cvError?.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profil Sayfası</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ad:</label>
          <input
            type="text"
            {...register("name")}
            defaultValue={profile?.first_name || ""}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Soyad:</label>
          <input
            type="text"
            {...register("surname")}
            defaultValue={profile?.second_name || ""}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            CV Detayları:
          </label>
          <textarea
            {...register("cvDetails")}
            defaultValue={cvData?.details || ""}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <Button type="submit" variant="primary">
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default ProfilePage;
