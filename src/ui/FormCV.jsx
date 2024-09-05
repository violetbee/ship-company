import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCV } from "../services/postAPI";
import { useNavigate } from "react-router";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { ReusuableInput } from "./FormsET";
import "../customQuill.css";

// Editor stil ayarları
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
  margin: "20px",
  overflowY: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  lineHeight: "3",
  fontFamily: "Arial, sans-serif",
  textAlign: "left",
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

    quill.clipboard.dangerouslyPasteHTML(
      `<div>
    <section>
      <h2>
        Kişisel Bilgiler / Personal Information
      </h2>
      <p>
        <strong>Ad Soyad / Full Name:</strong> Zeyn Öz
      </p>
     
      
     
      <p>
        <strong>Doğum Yeri İl / Birth Place (City):</strong> [Doğum Yeri İl Ekleyin]
      </p>
      <p>
        <strong>Doğum Yeri İlçe / Birth Place (District):</strong> [Doğum Yeri İlçe Ekleyin]
      </p>
      <p>
        <strong>Doğum Tarihi / Date of Birth:</strong> [Doğum Tarihini Ekleyin]
      </p>
      <p>
        <strong>Askerlik Durumu / Military Status:</strong> [Askerlik Durumunu Ekleyin]
      </p>
      <p>
        <strong>Kan Grubu / Blood Type:</strong> [Kan Grubunu Ekleyin]
      </p>
      <p>
        <strong>Boyu / Kilosu / Height / Weight:</strong> [Boyu/Kilosunu Ekleyin]
      </p>
      <p>
        <strong>Uyruk / Nationality:</strong> [Uyruk Ekleyin]
      </p>
      <p>
        <strong>Ayakkabı No/Tulum Bedeni / Shoe Size/Overall Size:</strong> [Ayakkabı No/Tulum Bedeni Ekleyin]
      </p>
      <p>
        <strong>Cinsiyeti / Gender:</strong> [Cinsiyeti Ekleyin]
      </p>
      <p>
        <strong>Kimlik No / ID Number:</strong> [Kimlik No Ekleyin]
      </p>
      <p>
        <strong>SSK Sicil No / SSK Registration Number:</strong> [SSK Sicil No Ekleyin]
      </p>
      <p>
        <strong>Emeklilik Durumu / Retirement Status:</strong> [Emeklilik Durumu Ekleyin]
      </p>
    </section>

    <section>
      <h2>
        Eğitim Bilgileri / Education
      </h2>
      <p>
        <strong>Okul Adı / School Name:</strong> [Okul Adını Ekleyin]
      </p>
      <p>
        <strong>Derece / Degree:</strong> [Derece Ekleyin]
      </p>
    </section>

    <section>
      <h2>
        Deneyim / Experience
      </h2>
      <p>
        <strong>Şirket Adı / Company Name:</strong> [Şirket Adını Ekleyin]
      </p>
      <p>
        <strong>Pozisyon / Role:</strong> [Pozisyonu Ekleyin]
      </p>
    </section>

    <section>
      <h2>
        Beceriler / Skills
      </h2>
      <p>
        List your skills...
      </p>
    </section>

    <section>
      <h2>
        Pasaport & Cüzdan / Passport & Wallet
      </h2>
      <p>
        <strong>Gemi Adamı Yeterlilik / Seaman's Certificate:</strong> [Gemi Adamı Yeterliliğini Ekleyin]
      </p>
      <p>
        <strong>Pasaport Tipi / Passport Type:</strong> [Pasaport Tipini Ekleyin]
      </p>
      <p>
        <strong>Pasaport No / Passport Number:</strong> [Pasaport No Ekleyin]
      </p>
      <p>
        <strong>Polis Vizesi Bitiş / Police Visa Expiry:</strong> [Polis Vizesi Bitiş Tarihini Ekleyin]
      </p>
      <p>
        <strong>Veren Makam / Issuing Authority:</strong> [Veren Makamı Ekleyin]
      </p>
      <p>
        <strong>Sağlık Vizesi Bitiş / Health Visa Expiry:</strong> [Sağlık Vizesi Bitiş Tarihini Ekleyin]
      </p>
      <p>
        <strong>Geçerlilik Tarihi / Validity Date:</strong> [Geçerlilik Tarihini Ekleyin]
      </p>
    </section>

    <section>
      <h2>
        Sertifika Bilgileri / Certificate Information
      </h2>
      <p>
        [Sertifika Bilgilerini Ekleyin]
      </p>
    </section>

    <section>
      <h2>
        Gemi & İş Tecrübeleri / Ship & Job Experience
      </h2>
      <p>
        [Gemi & İş Tecrübelerini Ekleyin]
      </p>
    </section>

    <section>
      <h2>
        Tercih Bilgileri / Preferences
      </h2>
      <p>
        <strong>1. Görev Tercihi / 1st Position Preference:</strong> [Görev Tercihini Ekleyin]
      </p>
      <p>
        <strong>2. Görev Tercihi / 2nd Position Preference:</strong> [Görev Tercihini Ekleyin]
      </p>
      <p>
        <strong>3. Görev Tercihi / 3rd Position Preference:</strong> [Görev Tercihini Ekleyin]
      </p>
      <p>
        <strong>Çalışma Şekli / Work Type:</strong> [Çalışma Şeklini Ekleyin]
      </p>
      <p>
        <strong>Bayrak Tercihi / Flag Preference:</strong> [Bayrak Tercihini Ekleyin]
      </p>
      <p>
        <strong>İşe Başlamak İstenilen Tarih / Desired Start Date:</strong> [İşe Başlamak İstenilen Tarihi Ekleyin]
      </p>
      <p>
        <strong>Çalışmak İstenilen Sefer Bölgesi / Desired Working Area:</strong> [Sefer Bölgesini Ekleyin]
      </p>
    </section>
  </div>`
    );

    quill.on("text-change", () => {
      setValue("details", quill.root.innerHTML);
    });
  }, [setValue]);

  const { mutate: createCVMutaion } = useMutation({
    mutationFn: createCV,
    onSuccess: () => {
      queryClient.invalidateQueries(["cvs", cachedProfile?.id]);
      navigate("/");
    },
  });

  const onSubmit = async (data) => {
    if (cachedCV) {
      alert("You already have a CV. Please update your existing CV.");
      return;
    }
    console.log(data);

    createCVMutaion({
      ...data,
      profile_id: cachedProfile?.id,
      imageURL: data.imageURL[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto w-full p-8 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create Your CV
      </h2>
      <input type="file" accept="image/*" {...register("imageURL")} />

      <ReusuableInput
        register={register}
        name="phone_number"
        label="Telefon Numarasi | | Phone Number"
      />

      <ReusuableInput
        register={register}
        name="Address"
        label="Adres | | Address"
      />

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Profile ID"
          hidden
          value={cachedProfile?.id || ""}
          {...register("profile_id", { required: "Profile ID is required" })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details
          </label>
          <div ref={quillRef} style={editorStyle}></div>
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
