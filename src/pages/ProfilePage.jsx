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
    if (profile?.id) {
      if (data.name || data.surname) {
        updateProfileMutation.mutate({
          profileId: profile.id,
          first_name: data.name,
          second_name: data.surname,
        });
      }

      if (data.cvDetails) {
        updateCVMutation.mutate({
          profileId: profile.id,
          cvDetails: data.cvDetails,
        });
      }
    } else {
      console.error("Profile ID is not available");
    }
  };

  if (profileLoading || cvLoading)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading...
      </div>
    );
  if (profileError || cvError)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-500">
        Error: {profileError?.message || cvError?.message}
      </div>
    );

  return (
    <div className=" flex flex-col bg-gradient-to-r from-blue-600 to-purple-600 px-4 pt-5">
      <main className="flex-grow p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Ad:
            </label>
            <input
              type="text"
              {...register("name")}
              defaultValue={profile?.first_name || ""}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Soyad:
            </label>
            <input
              type="text"
              {...register("surname")}
              defaultValue={profile?.second_name || ""}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              CV Detayları:
            </label>
            <textarea
              {...register("cvDetails")}
              defaultValue={cvData?.details || ""}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="6"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Kaydet
          </Button>
        </form>
      </main>
    </div>
  );
}

export default ProfilePage;
