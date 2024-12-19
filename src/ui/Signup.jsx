import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import PrivacyAgreement from "./PrivacyAgreement";
import { useRegisterAndCreateProfile } from "../hooks/useRegisterAndCreateProfile ";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("E-posta gerekli")
    .email("Geçersiz e-posta adresi")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/,
      "Sadece gmail.com, yahoo.com veya outlook.com adresleri kabul edilmektedir"
    ),
  password: yup
    .string()
    .required("Şifre gerekli")
    .min(8, "Şifre en az 8 karakter uzunluğunda olmalıdır")
    .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .matches(/[0-9]/, "Şifre en az bir rakam içermelidir"),
});

const Signup = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useRegisterAndCreateProfile();

  const onSubmit = async (data) => {
    if (!isAgreed) {
      // Gizlilik sözleşmesi onaylanmadıysa formu gönderme
      alert("Gizlilik Sözleşmesini kabul etmelisiniz.");
      return;
    }
    mutation.mutate(data);
  };

  const handleAgreementChange = (isChecked) => {
    setIsAgreed(isChecked);
  };

  return (
    <div className="flex items-center justify-center min-h-dvh py-12 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Formu</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              E-posta
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  id="email"
                  type="email"
                  {...field}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Şifre
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  id="password"
                  type="password"
                  {...field}
                  className={`mt-1 p-2 w-full border rounded-md ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <PrivacyAgreement onAgreementChange={handleAgreementChange} />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
