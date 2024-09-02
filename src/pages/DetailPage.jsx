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

  const isAuth = useSelector((state) => state.user.status === "authenticated");
  const isSuperUser = useSelector((state) => state.user.role === "superUser");
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
    mutationFn: () => postApplication(profile?.id, id),
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
    queryKey: ["applications", id],
    queryFn: () => getApplicationsByJobId(id),
    enabled: isSuperUser && !!id, // Sadece superUser rolü için
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

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-red-500">
        Error loading job details
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
              Created At
            </h2>
            <p className="text-gray-700">
              {new Date(jobData.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Required Personnel
            </h2>
            <p className="text-gray-700">{jobData.required_personnel}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Ship Type
            </h2>
            <p className="text-gray-700">{jobData.ship_type}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Tonnage
            </h2>
            <p className="text-gray-700">{jobData.tonnage}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Location
            </h2>
            <p className="text-gray-700">{jobData.location}</p>
          </div>

          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Flag Type
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

        {isAuth && (
          <button
            onClick={handlePost}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
            disabled={isCheckingApplication}
          >
            {isCheckingApplication ? "Checking..." : "Apply Now"}
          </button>
        )}

        {/* Super User bölümü */}
        {isSuperUser && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Applications
            </h2>

            {applicationsLoading ? (
              <Spinner />
            ) : (
              <div>
                {applications?.length > 0 ? (
                  applications.map((application) => (
                    <div
                      key={application.id}
                      className="bg-gray-50 p-6 rounded-lg shadow-md mb-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        Application ID: {application.id}
                      </h3>
                      <p className="text-gray-700">
                        Applied By: {application.profile_id}
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/id/${application.profile_id}`)
                        }
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      >
                        View CV
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No applications found.</p>
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
