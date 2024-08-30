import { LuTextCursor, LuShip } from "react-icons/lu";
import { BsGeoAlt } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
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

  const id = useSelector(getUserId);

  const { mutate: jobInserting, isLoading } = useMutation({
    mutationFn: insertJob,
    onSuccess: () => {
      queryClient.invalidateQueries("job_listings");
      reset();
      navigate("/");
    },
  });

  function onSubmit(data) {
    jobInserting(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container flex flex-col space-y-8 p-8 bg-red-500"
    >
      <div className="flex items-center space-x-2">
        <Input
          type="date"
          {...register("date", { required: "Tarih gerekli" })}
          className="w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <LuTextCursor className="text-xl text-white" />
        <Input
          type="text"
          placeholder="İlan Başlığı"
          {...register("title", { required: "İlan Başlığı gerekli" })}
          className="w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Gereken Personel"
          {...register("required_personnel", {
            required: "Gereken Personel gerekli",
          })}
          className="w-full"
        />
      </div>

      <input
        hidden
        type="text"
        defaultValue={id}
        placeholder="userId"
        {...register("user_id", {
          required: "Gereken Personel gerekli",
        })}
        className="w-full"
      />

      <input
        hidden
        type="text"
        placeholder="userId"
        defaultValue={id}
        {...register("userId", {
          required: "Gereken Personel gerekli",
        })}
        className="w-full"
      />

      <div className="flex items-center space-x-2">
        <LuShip className="text-xl text-white" />
        <select
          {...register("ship_type", { required: "Gemi Tipi gerekli" })}
          className="w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
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
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Tonaj"
          {...register("tonnage", { required: "Tonaj gerekli" })}
          className="w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <BsGeoAlt className="text-xl text-white" />
        <select
          {...register("location", { required: "Lokasyon gerekli" })}
          className="w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
          defaultValue=""
        >
          <option value="" disabled>
            Lokasyon
          </option>
          <option value="28">Giresun</option>
          <option value="34">İstanbul</option>
          <option value="55">Samsun</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <FaRegFlag className="text-xl text-white" />
        <select
          {...register("flag_type", { required: "Bayrak Türü gerekli" })}
          className="w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
          defaultValue=""
        >
          <option value="" disabled>
            Bayrak Türü
          </option>
          <option value="tc">TC</option>
          <option value="foreign">Yabancı</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="details"
          className="block text-sm font-medium text-gray-700"
        >
          İlan Detayları
        </label>
        <textarea
          id="details"
          rows="4"
          {...register("details", { required: "İlan Detayları gerekli" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.details && (
          <p className="mt-2 text-red-600">{errors.details.message}</p>
        )}
      </div>
      <Button
        disabled={isLoading}
        type="submit"
        className="flex gap-2 mt-4"
        variant="outline"
      >
        Gönder
      </Button>
    </form>
  );
}

export default JobForm;
