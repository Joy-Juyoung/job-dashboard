const API_BASE_URL = "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

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
    notes: job.notes ?? "",
  };
}

export async function fetchJobs() {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const jobs = await response.json();
  return jobs.map(normalizeJob);
}

export async function createJob(jobData) {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create job");
  }

  return normalizeJob(data);
}

export async function updateJobApi(id, updatedData) {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update job");
  }

  return normalizeJob(data);
}

export async function deleteJobApi(id) {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }

  return true;
}
