import { useQuery } from "@tanstack/react-query";
import { getAllJobs, getJobById } from "../services/getAPI";

export function useJobListing() {
  const {
    isLoading,
    error,
    data: jobListingData,
  } = useQuery({
    queryKey: ["job_listings"],
    queryFn: getAllJobs,
  });

  return { isLoading, error, jobListingData };
}

export function useJobById(id) {
  const {
    isLoading,
    error,
    data: jobData,
  } = useQuery({
    queryKey: ["job_listings", id],
    queryFn: () => getJobById(id),
  });

  return { isLoading, error, jobData };
}
