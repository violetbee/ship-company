import { store } from "../store";
import { supabase, supabaseUrl } from "../supabase/supabase";
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

export async function updateCV({
  profileId,
  cvDetails,
  Address,
  phone_number,
  imageURL,
  image,
}) {
  const imageName = `${Date.now()}-${image.name.replace(/\//g, "-")}`;

  const imagePath = `${supabaseUrl}//storage/v1/object/public/CVPictures/${imageName}`;

  const newImageUrl = imageURL.slice(-22);

  // Eski dosyayı silme
  const { error: deleteError } = await supabase.storage
    .from("CVPictures")
    .remove([newImageUrl]);

  if (deleteError) {
    throw new Error("Error deleting old image:", deleteError);
  }

  // Yeni dosyayı yükleme

  const { error: strErr } = await supabase.storage
    .from("CVPictures")
    .upload(imageName, image, {
      cacheControl: "3600",
      upsert: false,
    });

  // CV'yi güncelleme
  const { data: updatedCV, error } = await supabase
    .from("cvs")
    .update({ details: cvDetails, Address, phone_number, imageURL: imagePath })
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
  const imageName = `${Date.now()}-${cv.imageURL.name.replace(/\//g, "-")}`;

  const imagePath = `${supabaseUrl}//storage/v1/object/public/CVPictures/${imageName}`;

  const { data, error } = await supabase
    .from("cvs")
    .insert([{ ...cv, imageURL: imagePath }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  const { error: strErr } = await supabase.storage
    .from("CVPictures")
    .upload(imageName, cv.imageURL, {
      cacheControl: "3600",
      upsert: false,
    });

  return data;
}

export async function postApplication(userId, jobId, jobDataUserId) {
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        profile_id: userId,
        job_listing_id: jobId,
        jobCreatedUserId: jobDataUserId,
      },
    ])
    .select();

  return data;
}

export async function deleteJobPost(id, profile_id) {
  try {
    const { data, error } = await supabase
      .from("job_listings")
      .delete()
      .eq("id", id)
      .eq("user_id", profile_id);

    if (error) {
      throw new Error(error.message); // Hata mesajını fırlatıyoruz
    }

    // Eğer veri boşsa, hata durumu kabul edilir
    if (data.length === 0) {
      throw new Error("İlan bulunamadı veya silinmedi.");
    }

    return { data };
  } catch (err) {
    console.error("Delete job post failed:", err.message); // Hata mesajını console'a yazıyoruz
    return { error: err.message }; // Hata mesajını döndürüyoruz
  }
}

export async function uploadImage(file) {
  if (!file) return null;

  const fileName = `${Date.now()}_${file.name}`;

  // Dosyayı Supabase'e yükle
  const { data, error } = await supabase.storage
    .from("CVPictures") // Bucket adı
    .upload(fileName, file);

  if (error) {
    console.error("Dosya yükleme hatası:", error.message);
    return null;
  }

  // Yüklenen dosyanın URL'sini al
  const { publicUrl, error: publicUrlError } = supabase.storage
    .from("CVPictures")
    .getPublicUrl(fileName);

  if (publicUrlError) {
    console.error("URL alma hatası:", publicUrlError.message);
    return null;
  }

  return publicUrl.publicUrl || null;
}
