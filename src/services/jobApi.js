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

export async function createJob(jobData) {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  const createdJob = await response.json();
  return normalizeJob(createdJob);
}
