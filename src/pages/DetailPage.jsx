import { useParams } from "react-router";
import { useJobById } from "../hooks/useJobListing";
import { useSelector } from "react-redux";

function DetailPage() {
  const { id } = useParams();

  const { jobData, isLoading, error } = useJobById(id);
  console.log(jobData);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>{jobData.title}</p>
      <p>{jobData.date}</p>
      <p>{jobData.details}</p>
      <p>{jobData.flag_type}</p>
      <p>{jobData.location}</p>
      <p>{jobData.tonage}</p>
      <p>{jobData.required_personnel}</p>
      <p>{jobData.details}</p>
    </div>
  );
}

export default DetailPage;
