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
    // Authenticate user
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

    // Fetch user's profile
    let { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, second_name, role")
      .eq("user_id", loginData.user.id)
      .single();

    // Create a new profile if not found
    if (profilesError && profilesError.code === "PGRST116") {
      const { data: newProfile, error: newProfileError } = await supabase
        .from("profiles")
        .insert({
          user_id: loginData.user.id,
          first_name: " ", // Default first name
          second_name: " ", // Default last name
          role: "normalUser", // Default role
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

    // Dispatch user data to the store
    store.dispatch(
      getUserToken(
        loginData.user.id,
        loginData.user.aud,
        profilesData.first_name,
        profilesData.second_name,
        profilesData.role // Ensure role is included here
      )
    );

    return loginData;
  } catch (error) {
    console.error("Hata:", error.message);
    throw error; // Re-throw error for mutation hook handling
  }
}

export async function updateProfile({ profileId, first_name, second_name }) {
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update({ first_name, second_name })
    .eq("id", profileId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedProfile;
}

export async function updateCV({ profileId, cvDetails }) {
  const { data: updatedCV, error } = await supabase
    .from("cvs")
    .update({ details: cvDetails })
    .eq("profile_id", profileId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updatedCV;
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
