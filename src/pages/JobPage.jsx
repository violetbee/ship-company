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
    if (isSuperUser) {
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
      <div className="flex w-full items-center justify-between bg-[#171923] p-4 text-white">
        <p className="w-1/6">Tarih</p>
        <p className="w-1/6">Gereken Personel</p>
        <p className="w-1/6">Gemi Tipi</p>
        <p className="w-1/6">Tonaj</p>
        <p className="w-1/6">Bayrak Türü</p>
        <p className="w-1/6">Detay</p>
        {isSuperUser && <p className="w-1/6">Sil</p>}
      </div>
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
            {isSuperUser && (
              <button
                onClick={() => handleDelete(jobPosting?.id)}
                className="w-1/6 rounded-full bg-red-600 px-4 py-2 text-center text-white"
              >
                Sil
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default JobPage;
