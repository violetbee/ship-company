import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCV } from "../services/postAPI";
import { useNavigate } from "react-router";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const editorStyle = {
  height: "400px", // Editör yüksekliği
  minHeight: "300px", // Minimum yüksekliği
  maxHeight: "600px", // Maksimum yüksekliği
  border: "2px solid #000", // Kenarlık
  borderRadius: "8px", // Köşe yuvarlama
  borderColor: "#000", // Kenarlık rengi
  borderWidth: "2px", // Kenarlık genişliği
  borderStyle: "solid", // Kenarlık stili
  fontSize: "16px", // Yazı tipi boyutu
  color: "#333", // Yazı rengi
  backgroundColor: "#f9f9f9", // Arka plan rengi
  backgroundImage: "url('/path/to/image.jpg')", // Arka plan resmi
  backgroundSize: "cover", // Arka plan resmi boyutu
  backgroundRepeat: "no-repeat", // Arka plan resmi tekrarı
  backgroundPosition: "center", // Arka plan resmi konumu
  padding: "10px", // İç boşluk
  margin: "20px", // Dış boşluk
  overflowY: "auto", // Dikey kaydırma
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Gölgeler
  lineHeight: "1.5", // Satır yüksekliği
  fontFamily: "Arial, sans-serif", // Yazı tipi
  textAlign: "left", // Metin hizalaması
};
function CvForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const userId = useSelector(getUserId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cachedProfile = queryClient.getQueryData(["profiles", userId]);
  const cachedCV = queryClient.getQueryData(["cv", cachedProfile?.id]);

  const quillRef = useRef(null);

  useEffect(() => {
    const quill = new Quill(quillRef.current, {
      theme: "snow",
      placeholder: "Start writing your CV here...",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
        ],
      },
    });

    // Hazır bir şablon ekleme
    quill.clipboard.dangerouslyPasteHTML(
      `<div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8 space-y-6">
 
  <section>
    <h2 class="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-3 mb-5">
      Personal Information
    </h2>
    <p class="text-lg text-gray-800 mb-3">
      <span class="font-semibold">Full Name:</span> 
    </p>
    <p class="text-lg text-gray-800 mb-3">
      <span class="font-semibold">Email:</span>
    </p>
    <p class="text-lg text-gray-800">
      <span class="font-semibold">Phone:</span>
    </p>
  </section>

 
  <section>
    <h2 class="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-3 mb-5">
      Education
    </h2>
    <p class="text-lg text-gray-800 mb-3">
      <span class="font-semibold">School Name:</span>
    </p>
    <p class="text-lg text-gray-800">
      <span class="font-semibold">Degree:</span> 
    </p>
  </section>

  <!-- Experience Section -->
  <section>
    <h2 class="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-3 mb-5">
      Experience
    </h2>
    <p class="text-lg text-gray-800 mb-3">
      <span class="font-semibold">Company Name:</span> 
    </p>
    <p class="text-lg text-gray-800">
      <span class="font-semibold">Role:</span> 
    </p>
  </section>

  
  <section>
    <h2 class="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-3 mb-5">
      Skills
    </h2>
    <p class="text-lg text-gray-800">
      List your skills...
    </p>
  </section>
</div>
`
    );

    quill.on("text-change", () => {
      setValue("details", quill.root.innerHTML);
    });
  }, [setValue]);

  const { mutate } = useMutation({
    mutationFn: createCV,
    onSuccess: () => {
      queryClient.invalidateQueries(["cvs", cachedProfile?.id]);
      navigate("/");
    },
  });

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

        {/* Quill Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details
          </label>
          <div ref={quillRef} style={editorStyle}></div>{" "}
          {/* Inline stil uygulama */}
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
