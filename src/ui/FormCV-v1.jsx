import { useForm } from "react-hook-form";
import { Input } from "./input";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation } from "@tanstack/react-query";
import { createCV } from "../services/postAPI";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

function CvForm() {
  const [index, setIndex] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = useSelector(getUserId);

  const navigate = useNavigate();

  useEffect(() => {
    async function getId() {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("user_id");

      if (error) {
        console.error("Error fetching profiles:", error.message);
        return;
      }

      const index = profiles.findIndex((profile) => profile.user_id === id);

      const { data: profileIds } = await supabase.from("profiles").select("id");

      const profileID = profileIds.at(index).id;

      if (error) {
        console.error("Error fetching profiles:", error.message);
        return;
      }

      setIndex(profileID);

      const { data: cvs } = await supabase.from("cvs").select("profile_id");
      console.log(cvs.includes(index));
    }
    getId();
  }, [id]);

  const { mutate } = useMutation({
    mutationFn: createCV,
    onSuccess: () => navigate("/"),
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

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
          defaultValue={index}
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
