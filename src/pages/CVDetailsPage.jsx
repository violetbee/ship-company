import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { getCVByCVProfileID } from "../services/getAPI";
import "../customQuill.css";

function CVDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isSiteAdmin = useSelector((state) => state.user.role === "siteAdmin");

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

  // Eğer siteAdmin ise telefon numarası ve adresi ekle
  if (isSiteAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          CV Details
        </h1>

        {/* Profil Resmi */}
        {CVData.imageURL && (
          <div className="flex justify-center mb-8">
            <img
              src={CVData.imageURL}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border border-gray-300"
            />
          </div>
        )}

        <div
          className="custom-prose lg:prose-xl mx-auto text-gray-700"
          dangerouslySetInnerHTML={{ __html: CVData.details }}
        />

        {/* Telefon Numarası ve Adres */}
        {CVData.phone_number && (
          <div className="mt-4 text-gray-700">
            <h2 className="text-xl font-semibold mb-2">Phone Number</h2>
            <p>{CVData.phone_number}</p>
          </div>
        )}
        {CVData.Address && (
          <div className="mt-4 text-gray-700">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p>{CVData.Address}</p>
          </div>
        )}

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

  // SiteAdmin değilse sadece temel CV bilgilerini göster
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        CV Details
      </h1>

      {/* Profil Resmi */}
      {CVData.imageURL && (
        <div className="flex justify-center mb-8">
          <img
            src={CVData.imageURL}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border border-gray-300"
          />
        </div>
      )}

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
