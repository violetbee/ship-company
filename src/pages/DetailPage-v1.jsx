import { useNavigate, useParams } from "react-router";
import { useJobById } from "../hooks/useJobListing";
import Spinner from "../ui/Spinner";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, checkApplicationExists, getCV } from "../services/getAPI";
import { postApplication } from "../services/postAPI";

function DetailPage() {
  const { id } = useParams();
  const userId = useSelector(getUserId);
  const isAuth = useSelector((state) => state.user.status === "authenticated");
  const { jobData, isLoading, error } = useJobById(id);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });

  console.log(profileData);

  // Kullanıcının CV'sinin olup olmadığını kontrol etme
  const { data: hasCV, isLoading: isCheckingCV } = useQuery({
    queryKey: ["checkCV", profileData?.id],
    queryFn: () => getCV(profileData?.id),
    enabled: !!userId,
  });

  // Kullanıcının başvurusu olup olmadığını kontrol etme
  const { data: applicationExists, isLoading: isCheckingApplication } =
    useQuery({
      queryKey: ["applicationExists", profileData?.id, id],
      queryFn: () => checkApplicationExists(profileData?.id, id),
      enabled: !!profileData?.id && !!id,
    });

  const { mutate: postApp } = useMutation({
    mutationFn: () => postApplication(profileData.id, id),
    onSuccess: () => {
      alert("Başvuru başarıyla yapıldı!");
      queryClient.invalidateQueries(["applicationExists"]);
    },
    onError: () => {
      alert("Başvuru sırasında bir hata oluştu.");
    },
  });

  function handlePost() {
    if (isCheckingCV || isCheckingApplication) {
      alert("Kişisel bilgiler kontrol ediliyor, lütfen bekleyin.");
      return;
    }

    if (!hasCV) {
      alert("CV'niz bulunmuyor. Başvuru yapabilmek için CV'nizi yükleyin.");
      navigate("/cvekle");
      return;
    }

    if (applicationExists) {
      alert("Bu ilana zaten başvurmuşsunuz.");
      return;
    }

    postApp();
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-red-500">
        Error loading job details
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          {jobData.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* İçerikler */}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Details</h2>
          <p className="text-xl text-gray-800">{jobData.details}</p>
        </div>
        {isAuth && (
          <button
            onClick={handlePost}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
            disabled={isCheckingCV || isCheckingApplication} // Kontrol yapılırken butonu devre dışı bırak
          >
            {isCheckingCV || isCheckingApplication
              ? "Checking..."
              : "Apply Now"}
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
