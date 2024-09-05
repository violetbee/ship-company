import { useNavigate, useParams } from "react-router-dom";
import { useJobById } from "../hooks/useJobListing";
import Spinner from "../ui/Spinner";
import { useSelector } from "react-redux";
import { getUserId } from "../services/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkApplicationExists,
  getCV,
  getProfile,
  getApplicationsByJobId,
} from "../services/getAPI";
import { postApplication } from "../services/postAPI";
import { cleanHtmlContent } from "../helper/quil";
import "../customQuill.css";

function DetailPage() {
  const { id } = useParams();
  const userId = useSelector(getUserId);
  console.log(userId);

  const isAuth = useSelector((state) => state.user.status === "authenticated");
  const isSuperUser = useSelector((state) => state.user.role === "superUser");
  const isSiteAdmin = useSelector((state) => state.user.role === "siteAdmin");
  const { jobData, isLoading, error } = useJobById(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: profileLoading, data: profile } = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });

  const { isLoading: cvLoading, data: cv } = useQuery({
    queryKey: ["cv", profile?.id],
    queryFn: () => getCV(userId),
    enabled: !!userId,
  });

  // Kullanıcının başvurusu olup olmadığını kontrol etme
  const { data: applicationExists, isLoading: isCheckingApplication } =
    useQuery({
      queryKey: ["applicationExists", profile?.id, id],
      queryFn: () => checkApplicationExists(profile?.id, id),
      enabled: !!profile?.id && !!id,
    });

  const { mutate: postApp } = useMutation({
    mutationFn: () => postApplication(profile?.id, id, jobData?.user_id),
    onSuccess: () => {
      alert("Başvuru başarıyla yapıldı!");
      queryClient.invalidateQueries(["applicationExists"]);
    },
    onError: () => {
      alert("Başvuru sırasında bir hata oluştu.");
    },
  });

  // Başvuruları almak için useQuery
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["applications", userId],
    queryFn: () => getApplicationsByJobId(id, userId),
    enabled: (isSuperUser || isSiteAdmin) && !!id, // Sadece superUser rolü için
  });

  function handlePost() {
    if (!cv) {
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

  function handleLoginRedirect() {
    navigate("/login");
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-red-500">
        İş ilanı detayları yüklenirken bir hata oluştu
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          {jobData.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Oluşturulma Tarihi
            </h2>
            <p className="text-gray-700">
              {new Date(jobData.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Gereken Personel
            </h2>
            <p className="text-gray-700">{jobData.required_personnel}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Geminin Tipi
            </h2>
            <p className="text-gray-700">{jobData.ship_type}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Ölçü</h2>
            <p className="text-gray-700">{jobData.tonnage}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Konum</h2>
            <p className="text-gray-700">{jobData.location}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Bayrak Türü
            </h2>
            <p className="text-gray-700">{jobData.flag_type}</p>
          </div>
        </div>

        <div>
          <div
            className="custom-prose lg:prose-xl mx-auto text-gray-700"
            dangerouslySetInnerHTML={{
              __html: cleanHtmlContent(jobData.details),
            }}
          />
        </div>

        {isAuth ? (
          <>
            {isAuth && (
              <button
                onClick={handlePost}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                disabled={isCheckingApplication}
              >
                {isCheckingApplication ? "Kontrol Ediliyor..." : "Başvur"}
              </button>
            )}
          </>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Başvurmak İçin Giriş Yap
          </button>
        )}

        {/* Super User bölümü */}
        {(isSuperUser || isSiteAdmin) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Başvurular
            </h2>

            {applicationsLoading ? (
              <Spinner />
            ) : (
              <div>
                {applications?.length > 0 ? (
                  applications
                    .slice()
                    .reverse()
                    .map((application) => (
                      <div
                        key={application.id}
                        className="bg-gray-50 p-6 rounded-lg shadow-md mb-4"
                      >
                        <h3 className="text-lg font-semibold text-gray-800">
                          Başvuru ID: {application.id}
                        </h3>
                        <p className="text-gray-700">
                          Başvuru Yapan: {application.profile_id}
                        </p>
                        <button
                          onClick={() =>
                            navigate(`/id/${application.profile_id}`)
                          }
                          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                          CV'yi Görüntüle
                        </button>
                      </div>
                    ))
                ) : (
                  <p>Başvuru bulunamadı.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
