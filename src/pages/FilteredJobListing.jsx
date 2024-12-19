import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase";
import Spinner from "../ui/Spinner";

function JobListings() {
  const location = useLocation();

  const fetchJobs = async () => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get("title");
    const locationParam = searchParams.get("location");
    const flagType = searchParams.get("flagType");
    const shipType = searchParams.get("shipType");

    let query = supabase.from("job_listings").select("*");

    if (title) query = query.ilike("title", `%${title}%`);
    if (locationParam) query = query.eq("location", locationParam);
    if (flagType) query = query.eq("flag_type", flagType);
    if (shipType) query = query.eq("ship_type", shipType);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  };

  const queryKey = ["jobs", location.search];

  const {
    data: jobListingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: fetchJobs,
  });

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error loading jobs</div>;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between bg-[#171923] p-4 text-white">
        <p className="w-1/6">Tarih</p>
        <p className="w-1/6">Gereken Personel</p>
        <p className="w-1/6">Gemi Tipi</p>
        <p className="w-1/6">Tonaj</p>
        <p className="w-1/6">Bayrak Türü</p>
        <p className="w-1/6">Detay</p>
      </div>
      <div className="min-h-dvh">
        {jobListingData
          ?.slice()
          .reverse()
          .map((jobPosting) => (
            <div
              key={jobPosting?.id}
              className="flex w-full items-center justify-between border-t border-[#171923] bg-white p-4 text-[#171923]"
            >
              <p className="w-1/6">{jobPosting?.date}</p>
              <p className="w-1/6">{jobPosting?.required_personnel}</p>
              <p className="w-1/6">{jobPosting?.ship_type}</p>
              <p className="w-1/6">{jobPosting?.tonnage}</p>
              <p className="w-1/6">{jobPosting?.flag_type}</p>
              <Link
                className="w-1/6 rounded-full bg-[#171923] px-4 py-2 text-center text-white"
                to={`/ilanlar/${jobPosting?.id}`}
              >
                Detay
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JobListings;
