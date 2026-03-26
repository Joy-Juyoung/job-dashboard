const API_BASE_URL = "http://localhost:5000/api";

function normalizeJob(job) {
  return {
    id: job._id,
    company: job.company ?? "",
    position: job.position ?? "",
    status: job.status ?? "Applied",
    location: job.location ?? "",
    appliedDate: job.appliedDate ?? "",
    interviewDate: job.interviewDate ?? "",
    offerDate: job.offerDate ?? "",
    rejectedDate: job.rejectedDate ?? "",
  };
}

export async function fetchJobs() {
  const response = await fetch(`${API_BASE_URL}/jobs`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const jobs = await response.json();
  return jobs.map(normalizeJob);
}
