// components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { login } from "../services/postAPI";
import { getCV } from "../services/getAPI";
import { getUserId } from "../services/userSlice";

function LoginForm() {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      getCvMutation.mutate(userId); // Login başarılı olduğunda CV'yi çek
    },
    onError: (error) => console.error(error.message),
  });

  const getCvMutation = useMutation({
    mutationFn: getCV,
    onSuccess: (cvData) => {
      if (cvData && Object.keys(cvData).length > 0) {
        // Eğer cvData varsa ve boş değilse
        navigate("/"); // CV varsa ana sayfaya yönlendir
      } else {
        navigate("/cvekle"); // CV yoksa CV ekleme sayfasına yönlendir
      }
    },
    onError: (error) => console.error("CV yüklenemedi:", error.message),
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data); // Login fonksiyonunu tetikle
  };

  const handleSignupClick = () => {
    navigate("/signup"); // Kayıt sayfasına yönlendir
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Giriş Yap
        </h2>

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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
        >
          Giriş Yap
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-700">
            Hesabınız yok mu?{" "}
            <button
              type="button"
              onClick={handleSignupClick}
              className="text-blue-500 hover:underline"
            >
              Kayıt Ol
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
