import { useMutation } from "@tanstack/react-query";
import { createProfile, registerUser } from "../services/postAPI";

export function useRegisterAndCreateProfile() {
  return useMutation({
    mutationFn: async (data) => {
      // Kullanıcıyı kaydet
      const user = await registerUser(data.email, data.password);

      if (!user || !user.id) {
        throw new Error("Kullanıcı oluşturulamadı veya ID alınamadı.");
      }

      // Profil oluştur
      await createProfile(user.id, data.firstName, data.lastName);

      return user;
    },
    onSuccess: () => {
      // Başarı durumunda yapılacak işlemler
    },
    onError: (error) => {
      // Hata durumunda yapılacak işlemler
      console.error("Hata:", error.message);
    },
  });
}
