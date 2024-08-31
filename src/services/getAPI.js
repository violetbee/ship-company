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

    if (!sessionData.session) {
      console.warn("No session data available.");
      return;
    }

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles") // Correct table name
      .select("first_name, second_name, role") // Include the role field
      .eq("user_id", sessionData.session.user.id) // Fetch profile data specific to the user
      .single(); // Use single() to get a single record

    if (profilesError) {
      console.error("Profiles error:", profilesError.message);
      return;
    }

    if (!profilesData) {
      console.warn("No profile data available.");
      return;
    }

    // Dispatch user data to the Redux store
    store.dispatch(
      getUserToken(
        sessionData.session.user.id,
        sessionData.session.user.aud,
        profilesData.first_name,
        profilesData.second_name,
        profilesData.role // Include the role in the dispatched action
      )
    );

    return sessionData;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function getProfile(userId) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, first_name, second_name")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return profile;
}

export async function getCV(userId) {
  const profile = await getProfile(userId);

  if (!profile?.id) return [];

  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("profile_id", profile.id)
    .single();

  if (error) return [];

  return data;
}
