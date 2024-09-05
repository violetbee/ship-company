import { useForm } from "react-hook-form";
import UserProfileHeader, { ReusuableInput } from "./FormsET";

export function LanguageForm() {
  const { register, handleSubmit } = useForm();

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
          <ReusuableInput register={register} name="language" label="Dil" />
          <ReusuableInput register={register} name="level" label="Seviye" />
        </div>
        <div className="flex items-center gap-5 justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
