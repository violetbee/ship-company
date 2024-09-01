import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const JobPage = () => {
  const queryClient = useQueryClient();

  const cachedJob = queryClient.getQueryData(["job_listings"]);
  return (
    <div className=" w-full">
      <div className="flex w-full items-center justify-between bg-[#171923] p-4 text-white">
        <p className="w-1/6">Tarih</p>
        <p className="w-1/6">Gereken Personel</p>
        <p className="w-1/6">Gemi Tipi</p>
        <p className="w-1/6">Tonaj</p>
        <p className="w-1/6">Bayrak Türü</p>
        <p className="w-1/6">Detay</p>
      </div>
      {cachedJob
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
  );
};

export default JobPage;
