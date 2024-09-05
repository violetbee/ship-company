import { Link } from "react-router-dom";
import UserProfileHeader, { Options, ReusuableInput, Select } from "./FormsET";
import { scroller } from "react-scroll";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function WorkExperienceForm() {
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
        <h2 className="text-2xl font-bold mb-4">GEMİ & İŞ TECRÜBELERİNİZ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusuableInput
            register={register}
            name="companyName"
            label="Firma Adı"
          />
          <ReusuableInput
            register={register}
            name="shipName"
            label="Gemi Adı"
          />
          <ReusuableInput
            register={register}
            name="startDate"
            label="Başlangıç Tarihi"
            type="date"
          />
          <ReusuableInput
            register={register}
            name="endDate"
            label="Bitiş Tarihi"
            type="date"
          />
          <Select register={register} name="shipType" label="Gemi Tipi">
            <Options value="">Seçiniz</Options>
            {/* Diğer seçenekler */}
          </Select>
          <Select register={register} name="role" label="Göreviniz">
            <Options value="">Seçiniz</Options>
            {/* Diğer seçenekler */}
          </Select>
          <Select register={register} name="engineType" label="Makine Tipi">
            <Options value="">Seçiniz</Options>
            {/* Diğer seçenekler */}
          </Select>
          <ReusuableInput
            register={register}
            name="enginePower"
            label="Makine Gücü"
            type="text"
          />
          <Select register={register} name="flagType" label="Bayrak Türü">
            <Options value="TR">Türkiye</Options>
            {/* Diğer seçenekler */}
          </Select>
          <ReusuableInput
            register={register}
            name="tonnage"
            label="Tonaj"
            type="text"
          />
          <ReusuableInput
            register={register}
            name="reasonForLeaving"
            label="Ayrılma Sebebi"
            type="text"
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
            <Link
              to="/user/egitim"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Sonraki Sayfaya Geç
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
