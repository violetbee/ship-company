import { Link } from "react-router-dom";
import { useJobListing } from "../hooks/useJobListing";
import Spinner from "../ui/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { deleteJobPost } from "../services/postAPI";

const JobPage = () => {
  const { isLoading, error, jobListingData } = useJobListing();
  const userId = useSelector(getUserId);
  const isSuperUser = useSelector((state) => state.user.role === "superUser");
  const isSiteAdmin = useSelector((state) => state.user.role === "siteAdmin");

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (jobId) => deleteJobPost(jobId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobListings"]);
      alert("İlan başarıyla silindi.");
    },
    onError: (error) => {
      alert(
        `İlanı silerken bir hata oluştu: ${error.message || "Bilinmeyen hata"}`
      );
    },
  });

  const handleDelete = (jobId) => {
    if (isSuperUser || isSiteAdmin) {
      deleteMutation.mutate(jobId);
    } else {
      alert("Bu işlemi gerçekleştirme yetkiniz yok.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Bir hata oluştu: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center bg-[#171923] p-4 text-white">
        <p className="w-1/5">Tarih</p>
        <p className="w-1/5">Yeterlilik</p>
        <p className="w-1/5">Gemi Tipi</p>
        <p className="w-1/5">Tonaj</p>
        <p className="w-1/5">Bayrak Türü</p>
        {isSuperUser || isSiteAdmin ? <p className="w-auto">Sil</p> : null}
      </div>
      <div className="min-h-dvh overflow-scroll">
        {jobListingData
          ?.slice()
          .reverse()
          .map((jobPosting) => (
            <div
              key={jobPosting.id}
              className="flex items-center justify-between border-t border-[#171923] bg-white p-4 text-[#171923] hover:text-blue-800 hover:bg-gray-100"
            >
              <Link
                className="flex w-full items-center"
                to={`/ilanlar/${jobPosting.id}`}
              >
                <p className="w-1/5">{jobPosting.date}</p>
                <p className="w-1/5">{jobPosting.yeterlilik}</p>
                <p className="w-1/5">{jobPosting.ship_type}</p>
                <p className="w-1/5">{jobPosting.tonnage}</p>
                <p className="w-1/5">{jobPosting.flag_type}</p>
              </Link>
              {(isSuperUser || isSiteAdmin) && (
                <button
                  onClick={() => handleDelete(jobPosting.id)}
                  className="ml-4 rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobPage;
