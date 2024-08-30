// components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../services/postAPI";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => navigate("/"),
    onError: (error) => console.error(error.message),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          E-posta:
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "E-posta gerekli",
            pattern: {
              value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              message: "Geçerli bir e-posta adresi girin",
            },
          })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Şifre:
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Şifre gerekli",
            minLength: { value: 6, message: "Şifre en az 6 karakter olmalı" },
          })}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
      >
        Giriş Yap
      </button>
    </form>
  );
}

export default LoginForm;
