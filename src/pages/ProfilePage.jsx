import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { Button } from "../ui/Button";
import { updateCV, updateProfile } from "../services/postAPI";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { ReusuableInput } from "../ui/FormsET";

const editorStyle = {
  height: "600px",
  minHeight: "400px",
  maxHeight: "800px",
  width: "100%",
  border: "2px solid #000",
  borderRadius: "8px",
  borderColor: "#000",
  borderWidth: "2px",
  borderStyle: "solid",
  fontSize: "16px",
  color: "#333",
  backgroundColor: "#f9f9f9",
  backgroundImage: "url('/path/to/image.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  padding: "10px",

  overflowY: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  lineHeight: "3",
  fontFamily: "Arial, sans-serif",
  textAlign: "left",
};

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
          imageURL: cachedCV.imageURL,
          image: data.imageURL[0],
          phone_number: "555",
          Address: "555",
        });
      }
    } else {
      console.error("Profile ID is not available");
    }
  };

  return (
    <div className="flex flex-col  bg-gradient-to-r from-blue-600 to-purple-600 px-4 pt-5">
      <main className="flex-grow p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full  mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          {cachedCV.imageURL ? (
            <div className="flex justify-center mb-8">
              <img
                src={cachedCV?.imageURL}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border border-gray-300"
              />
            </div>
          ) : (
            "no image"
          )}
          <input type="file" accept="image/*" {...register("imageURL")} />

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
            <ReusuableInput
              register={register}
              name="phone_number"
              defaultValue={cachedCV?.phone_number}
              label="Telefon Numarasi | | Phone Number"
            />

            <ReusuableInput
              register={register}
              name="Address"
              defaultValue={cachedCV?.Address}
              label="Adres | | Address"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              İş Deneyimleri:
            </label>
            <div ref={quillRef} style={editorStyle} />
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
