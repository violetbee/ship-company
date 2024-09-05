import { Link } from "react-router-dom";
import { CarouselDemo } from "../ui/app/_components/carousel";
import bg from "../assets/giresun.jpeg";
import { useJobListing } from "../hooks/useJobListing";
import Spinner from "../ui/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { getCV, getProfile } from "../services/getAPI";
import { deleteJobPost } from "../services/postAPI";

export default function Home() {
  const { isLoading, error, jobListingData } = useJobListing();
  const userId = useSelector(getUserId);
  const isSuperUser = useSelector((state) => state.user.role === "superUser");
  const isAuthenticated = useSelector(
    (state) => state.user.status === "authenticated"
  );

  const { data: profile } = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId && isAuthenticated,
  });

  const { data: cv } = useQuery({
    queryKey: ["cv", profile?.id],
    queryFn: () => getCV(userId),
    enabled: !!userId && isAuthenticated,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (jobId) => deleteJobPost(jobId, userId),
    onSuccess: (data) => {
      // Eğer data boşsa, işlemin başarılı olmadığını varsayabiliriz
      if (data.error) {
        alert("İlanı silerken bir hata oluştu ilanin sahibi siz degilsiniz");
      } else {
        queryClient.invalidateQueries(["jobListings"]);
        alert("İlan başarıyla silindi.");
      }
    },
    onError: (error) => {
      // Hata nesnesini doğrudan alırız
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

  return (
    <main className="mb-10 text-white">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          width: "100%",
          height: "500px",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      >
        <div className="container flex h-full w-full flex-col items-end justify-end pb-14 pl-8">
          <h1 className="cursor-pointer bg-[#171923] p-4 text-center text-4xl font-bold duration-200 hover:bg-[#0b0c0f]">
            Güven Crewing Agency
          </h1>
          <p className="mt-4 cursor-pointer bg-[#0b0c0f] p-4 text-center text-lg duration-200 hover:bg-[#171923]">
            Denizcilik sektöründe 20 yıllık tecrübe
          </p>
        </div>
      </div>

      <div className="container mt-8 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold text-[#171923]">
          Öne Çıkarılanlar
        </h2>
        <CarouselDemo />
      </div>

      <div className="container mt-8 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold text-[#171923]">
          Son İlanlar
        </h2>
        <div className="mt-4 w-full">
          <div className="flex w-full items-center justify-between bg-[#171923] p-4 text-white">
            <p className="w-1/6">Tarih</p>
            <p className="w-1/6">Gereken Personel</p>
            <p className="w-1/6">Gemi Tipi</p>
            <p className="w-1/6">Tonaj</p>
            <p className="w-1/6">Bayrak Türü</p>
            {isSuperUser && <p className="w-1/6">Sil</p>}{" "}
            {/* Silme başlığı yalnızca superUser'lara gösterilir */}
          </div>
          {jobListingData
            .slice(-3)
            .reverse()
            .map((jobPosting) => (
              <div
                key={jobPosting.id}
                className="flex w-full items-center justify-between border-t border-[#171923] bg-white p-4 text-[#171923]"
              >
                <p className="w-1/6">{jobPosting.date}</p>
                <p className="w-1/6">{jobPosting.required_personnel}</p>
                <p className="w-1/6">{jobPosting.ship_type}</p>
                <p className="w-1/6">{jobPosting.tonnage}</p>
                <p className="w-1/6">{jobPosting.flag_type}</p>
                <Link
                  className="w-1/6 rounded-full bg-[#171923] px-4 py-2 text-center text-white"
                  to={`/ilanlar/${jobPosting.id}`}
                >
                  Detay
                </Link>
                {isSuperUser && (
                  <button
                    onClick={() => handleDelete(jobPosting.id)}
                    className="w-1/6 rounded-full bg-red-600 px-4 py-2 text-center text-white"
                  >
                    Sil
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
