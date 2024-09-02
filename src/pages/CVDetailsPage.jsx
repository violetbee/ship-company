import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getCVByCVProfileID } from "../services/getAPI";
import "../customQuill.css";

function CVDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fonksiyon: Bir önceki sayfaya dön
  const handleGoBack = () => {
    navigate(-1);
  };

  const {
    data: CVData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cvLookingFor", id],
    queryFn: () => getCVByCVProfileID(id),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center p-4">
        Error fetching CV: {error.message}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        CV Details
      </h1>

      <div
        className="custom-prose lg:prose-xl mx-auto text-gray-700"
        dangerouslySetInnerHTML={{ __html: CVData.details }}
      />

      {/* Geri Dönme Butonu */}
      <div className="mt-8 text-center">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CVDetailsPage;
