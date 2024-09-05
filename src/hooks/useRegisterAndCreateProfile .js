import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/postAPI";
import { useNavigate } from "react-router";

export function useRegisterAndCreateProfile() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      // Sadece kullanıcıyı kaydet
      const user = await registerUser(data.email, data.password);

      return user;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Hata:", error.message);
    },
  });
}
