import { store } from "../store";
import { supabase } from "../supabase/supabase";
import { getUserToken, userLogout } from "./userSlice";

export async function insertJob(job) {
  const { data, error } = await supabase
    .from("job_listings")
    .insert([job])
    .select();

  if (error) {
    console.log("is listeye eklenemedi");
  }

  return data;
}

export async function login({ email, password }) {
  try {
    // Kullanıcıyı giriş yapma işlemi
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      console.error("Giriş hatası:", loginError.message);
      throw new Error(
        "Giriş yapılamadı. Lütfen e-posta ve şifrenizi kontrol edin."
      );
    }

    if (!loginData.user) {
      throw new Error("Kullanıcı bilgileri bulunamadı.");
    }

    // Kullanıcının profilini çekme
    let { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("first_name, second_name")
      .eq("user_id", loginData.user.id)
      .single();

    // Profil bulunamazsa yeni profil oluşturma
    if (profilesError && profilesError.code === "PGRST116") {
      const { data: newProfile, error: newProfileError } = await supabase
        .from("profiles")
        .insert({
          user_id: loginData.user.id,
          first_name: " ", // Varsayılan ad
          second_name: " ", // Varsayılan soyad
        })
        .select()
        .single();

      if (newProfileError) {
        console.error("Profil oluşturma hatası:", newProfileError.message);
        throw new Error("Yeni profil oluşturulamadı.");
      }

      profilesData = newProfile;
    } else if (profilesError) {
      console.error("Profil verisi hatası:", profilesError.message);
      throw new Error("Profil verisi alınamadı.");
    }

    // Kullanıcı token'ı ve profil verileri ile aksiyonu tetikleme
    store.dispatch(
      getUserToken(
        loginData.user.id,
        loginData.user.aud,
        profilesData.first_name,
        profilesData.second_name
      )
    );

    return loginData;
  } catch (error) {
    console.error("Hata:", error.message);
    throw error; // Hatanın mutation hook tarafından işlenmesi için yeniden fırlat
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  store.dispatch(userLogout());

  return error;
}

export async function registerUser(email, password) {
  const { user, error } = await supabase.auth.signUp(
    { email, password },
    { shouldSendVerificationEmail: false }
  );

  if (error) {
    throw new Error(error.message);
  }

  // Supabase kullanıcı objesi `user` altında olabilir, doğru yapıyı kontrol edin
  console.log("Kullanıcı:", user); // Debug için
  return user;
}

export async function createProfile(userId, firstName, lastName) {
  const { error } = await supabase.from("profiles").insert({
    id: userId,
    first_name: firstName,
    second_name: lastName,
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function createCV(cv) {
  const { data, error } = await supabase.from("cvs").insert([cv]).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
