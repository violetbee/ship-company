import { useParams } from "react-router";
import { useJobById } from "../hooks/useJobListing";

import Spinner from "../ui/Spinner";

function DetailPage() {
  const { id } = useParams();
  const { jobData, isLoading, error } = useJobById(id);

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
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Date</h2>
            <p className="text-xl text-gray-800">{jobData.date}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              Ship Type
            </h2>
            <p className="text-xl text-gray-800">{jobData.ship_type}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">
              Tonnage
            </h2>
            <p className="text-xl text-gray-800">{jobData.tonnage}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">
              Location
            </h2>
            <p className="text-xl text-gray-800">{jobData.location}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-red-700 mb-2">
              Flag Type
            </h2>
            <p className="text-xl text-gray-800">{jobData.flag_type}</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-teal-700 mb-2">
              Required Personnel
            </h2>
            <p className="text-xl text-gray-800">
              {jobData.required_personnel}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Details</h2>
          <p className="text-xl text-gray-800">{jobData.details}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
