import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { Button } from "../ui/Button";
import { updateCV, updateProfile } from "../services/postAPI";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function ProfilePage() {
  const { register, handleSubmit, setValue } = useForm();
  const userId = useSelector(getUserId);
  const queryClient = useQueryClient();

  const cachedProfile = queryClient.getQueryData(["profiles", userId]);
  const cachedCV = queryClient.getQueryData(["cv", cachedProfile?.id]);

  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const toolbarOptions = [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ];

      const quill = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });

      // Quill'de değer ayarla
      if (cachedCV?.details) {
        quill.clipboard.dangerouslyPasteHTML(cachedCV.details);
      }

      // Değer değişikliği olduğunda form kontrolüne ayarla
      quill.on("text-change", () => {
        setValue("cvDetails", quill.root.innerHTML);
      });
    }
  }, [cachedCV, setValue]);

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
      queryClient.invalidateQueries(["cv", cachedProfile?.id]);
    },
    onError: (error) => {
      console.error("CV update error:", error);
    },
  });

  const onSubmit = (data) => {
    if (cachedProfile?.id) {
      if (data.name || data.surname) {
        updateProfileMutation.mutate({
          profileId: cachedProfile.id,
          first_name: data.name,
          second_name: data.surname,
        });
      }

      if (data.cvDetails) {
        updateCVMutation.mutate({
          profileId: cachedProfile.id,
          cvDetails: data.cvDetails,
        });
      }
    } else {
      console.error("Profile ID is not available");
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-600 to-purple-600 px-4 pt-5">
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
              defaultValue={cachedProfile?.first_name || ""}
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
              defaultValue={cachedProfile?.second_name || ""}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              İş Deneyimleri:
            </label>
            <div
              ref={quillRef}
              className="w-full p-3 border border-gray-300 rounded-md"
              style={{ minHeight: "200px" }}
            />
            <textarea {...register("cvDetails")} className="hidden" />
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
