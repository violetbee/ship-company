import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCV } from "../services/postAPI";
import { useNavigate } from "react-router";

function CvForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userId = useSelector(getUserId);
  const navigate = useNavigate();

  // Fetch profiles and find the profile ID
  const queryClient = useQueryClient();

  const cachedProfile = queryClient.getQueryData(["profiles", userId]);

  const cachedCV = queryClient.getQueryData(["cv", cachedProfile?.id]);

  // Handle form submission
  const { mutate } = useMutation({
    mutationFn: createCV,
    onSuccess: () => {
      queryClient.invalidateQueries(["cvs", cachedProfile?.id]); // Invalidate the query for cvs
      navigate("/"); // Navigate to the desired page
    },
  });

  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", cachedCV);

  const onSubmit = async (data) => {
    if (!cachedCV) {
      alert("You already have a CV. Please update your existing CV.");
      return;
    }

    mutate({ ...data, profile_id: cachedProfile?.id });
  };

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
          value={cachedProfile?.id || ""}
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
