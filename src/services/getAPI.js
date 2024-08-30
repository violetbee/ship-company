import { store } from "../store";
import { supabase } from "../supabase/supabase";
import { getUserToken } from "./userSlice";

export async function getAllJobs() {
  const { data: job_listings, error } = await supabase
    .from("job_listings")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("blog gönderileri çekilemedi");
  }

  return job_listings;
}

export async function getJobById(id) {
  const { data: job_listings, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("İş ilanı getirilemedi");
  }

  return job_listings[0];
}

export async function getSession() {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError.message);
      return;
    }

    // Eğer sessionData mevcut değilse, fonksiyonu bitir
    if (!sessionData.session) {
      console.warn("No session data available.");
      return;
    }

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles") // Burada doğru tablo adını kullanmalısınız
      .select("first_name, second_name")
      .eq("user_id", sessionData.session.user.id) // Kullanıcıya özgü profil verisini getirmek için
      .single(); // Tek bir kayıt dönerse single() kullanabilirsiniz

    if (profilesError) {
      console.error("Profiles error:", profilesError.message);
      return;
    }

    if (!profilesData) {
      console.warn("No profile data available.");
      return;
    }

    store.dispatch(
      getUserToken(
        sessionData.session.user.id,
        sessionData.session.user.aud,
        profilesData.first_name,
        profilesData.second_name
      )
    );

    return sessionData;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
