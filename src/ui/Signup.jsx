import { useForm } from "react-hook-form";
import { useRegisterAndCreateProfile } from "../hooks/useRegisterAndCreateProfile ";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useRegisterAndCreateProfile();

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center py-12 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Formu</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "E-posta gerekli",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Geçerli bir e-posta adresi girin",
                },
              })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
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
            <input
              id="password"
              type="password"
              {...register("password", { required: "Şifre gerekli" })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

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
