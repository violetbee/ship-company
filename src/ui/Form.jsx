import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertJob } from "../services/postAPI";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useNavigate } from "react-router";

function JobForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userId = useSelector(getUserId);

  const { mutate: jobInserting, isLoading } = useMutation({
    mutationFn: insertJob,
    onSuccess: () => {
      queryClient.invalidateQueries("job_listings");
      reset();
      navigate("/");
    },
  });

  function onSubmit(data) {
    const jobData = {
      ...data,
      user_id: userId,
    };

    jobInserting(jobData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Yeni İş İlanı Oluştur
        </h2>

        <div className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="İlan Başlığı"
              {...register("title", { required: "İlan Başlığı gerekli" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Gereken Personel"
              {...register("required_personnel", {
                required: "Gereken Personel gerekli",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black"
            />
            {errors.required_personnel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.required_personnel.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("ship_type", { required: "Gemi Tipi gerekli" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:border-blue-500 text-black"
              defaultValue=""
            >
              <option value="" disabled>
                Gemi Tipi
              </option>
              <option value="kuru">Kuru Yük</option>
              <option value="dokme">Dökme Yük</option>
              <option value="roro">RoRo/Ferry</option>
              <option value="lpg">LPG</option>
              <option value="chem">Kimyasal Tanker</option>
              <option value="yat">Yat</option>
              <option value="yakit">Yakıt Barcı</option>
              <option value="petrol">Petrol Tankeri</option>
              <option value="konteyner">Konteyner</option>
              <option value="balikci">Balıkçı Gemisi</option>
            </select>
            {errors.ship_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ship_type.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Tonaj"
              {...register("tonnage", { required: "Tonaj gerekli" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black"
            />
            {errors.tonnage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tonnage.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("location", { required: "Lokasyon gerekli" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:border-blue-500 text-black"
              defaultValue=""
            >
              <option value="" disabled>
                Lokasyon
              </option>
              <option value="28">Giresun</option>
              <option value="34">İstanbul</option>
              <option value="55">Samsun</option>
            </select>
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("flag_type", { required: "Bayrak Türü gerekli" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:border-blue-500 text-black"
              defaultValue=""
            >
              <option value="" disabled>
                Bayrak Türü
              </option>
              <option value="tc">TC</option>
              <option value="foreign">Yabancı</option>
            </select>
            {errors.flag_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.flag_type.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-black"
            >
              İlanın Son Tarihi
            </label>
            <Input
              type="date"
              {...register("date", { required: "Tarih gerekli" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-black"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-black"
            >
              İlan Detayları
            </label>
            <textarea
              id="details"
              rows="4"
              {...register("details", { required: "İlan Detayları gerekli" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            />
            {errors.details && (
              <p className="mt-2 text-red-600">{errors.details.message}</p>
            )}
          </div>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          variant="outline"
        >
          Gönder
        </Button>
      </form>
    </div>
  );
}

export default JobForm;
