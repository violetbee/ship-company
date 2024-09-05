import { Link } from "react-router-dom";
import UserProfileHeader, { Options, ReusuableInput, Select } from "./FormsET";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { scroller } from "react-scroll";

export function EducationForm() {
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    scroller.scrollTo("top", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }, []);

  function onSubmit(data) {
    console.log(data);
    // Form gönderimi işlemlerini yapın
  }

  return (
    <div className="container mx-auto p-6">
      <UserProfileHeader />
      <form
        name="top"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            register={register}
            name="graduationStatus"
            label="Mezuniyet Durumu"
          >
            <Options value="">Seçiniz</Options>
            <Options value="highSchool">Lise</Options>
            <Options value="bachelor">Lisans</Options>
            <Options value="master">Yüksek Lisans</Options>
            <Options value="doctorate">Doktora</Options>
            {/* Diğer seçenekler */}
          </Select>
          <ReusuableInput
            register={register}
            name="schoolName"
            label="Mezun Olunan Okul"
          />
          <ReusuableInput
            register={register}
            name="department"
            label="Mezun Olunan Bölüm"
          />
          <ReusuableInput
            register={register}
            name="graduationYear"
            label="Mezuniyet Yılı"
            type="date"
          />
          <ReusuableInput
            register={register}
            name="computerSkills"
            label="Bilgisayar Bilginiz"
          />
        </div>
        <div className="flex items-center gap-5 justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Değişiklikleri Kaydet
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105">
            <Link to="/user/dil" className="block">
              Sonraki Sayfaya Geç
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
