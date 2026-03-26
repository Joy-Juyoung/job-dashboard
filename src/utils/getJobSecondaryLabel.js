import { formatDate } from "./formatDate";

function getJobSecondaryLabel(job) {
  if (!job) return "";

  if (job.status === "Interview" && job.interviewDate) {
    return `Interview: ${formatDate(job.interviewDate)}`;
  }

  if (job.status === "Offer" && job.offerDate) {
    return `Offer: ${formatDate(job.offerDate)}`;
  }

  if (job.status === "Rejected" && job.rejectedDate) {
    return `Rejected: ${formatDate(job.rejectedDate)}`;
  }

  return "";
}

export default getJobSecondaryLabel;
