import { useState } from "react";

function getInitialFormData(editingJob) {
  if (editingJob) {
    return {
      company: editingJob.company || "",
      position: editingJob.position || "",
      status: editingJob.status || "Applied",
      location: editingJob.location || "",
      appliedDate: editingJob.appliedDate || "",
      interviewDate: editingJob.interviewDate || "",
      offerDate: editingJob.offerDate || "",
      rejectedDate: editingJob.rejectedDate || "",
      notes: editingJob.notes || "",
    };
  }

  return {
    company: "",
    position: "",
    status: "Applied",
    location: "",
    appliedDate: "",
    interviewDate: "",
    offerDate: "",
    rejectedDate: "",
    notes: "",
  };
}

function validateJobForm(formData) {
  const nextErrors = {};

  if (!formData.company.trim()) {
    nextErrors.company = "Company is required.";
  }

  if (!formData.position.trim()) {
    nextErrors.position = "Position is required.";
  }

  if (!formData.location.trim()) {
    nextErrors.location = "Location is required.";
  }

  if (!formData.appliedDate) {
    nextErrors.appliedDate = "Applied date is required.";
  }

  if (formData.status === "Interview" && !formData.interviewDate) {
    nextErrors.interviewDate =
      "Interview date is required for Interview status.";
  }

  if (formData.status === "Offer" && !formData.offerDate) {
    nextErrors.offerDate = "Offer date is required for Offer status.";
  }

  if (formData.status === "Rejected" && !formData.rejectedDate) {
    nextErrors.rejectedDate = "Rejected date is required for Rejected status.";
  }

  if (
    formData.interviewDate &&
    formData.appliedDate &&
    formData.interviewDate < formData.appliedDate
  ) {
    nextErrors.interviewDate =
      "Interview date cannot be earlier than applied date.";
  }

  if (
    formData.offerDate &&
    formData.appliedDate &&
    formData.offerDate < formData.appliedDate
  ) {
    nextErrors.offerDate = "Offer date cannot be earlier than applied date.";
  }

  if (
    formData.rejectedDate &&
    formData.appliedDate &&
    formData.rejectedDate < formData.appliedDate
  ) {
    nextErrors.rejectedDate =
      "Rejected date cannot be earlier than applied date.";
  }

  if (formData.notes.length > 500) {
    nextErrors.notes = "Notes must be less than 500 characters.";
  }

  return nextErrors;
}

function normalizeJobData(formData) {
  return {
    company: formData.company.trim(),
    position: formData.position.trim(),
    status: formData.status,
    location: formData.location.trim(),
    appliedDate: formData.appliedDate,
    interviewDate:
      formData.status === "Interview" ? formData.interviewDate : "",
    offerDate: formData.status === "Offer" ? formData.offerDate : "",
    rejectedDate: formData.status === "Rejected" ? formData.rejectedDate : "",
    notes: formData.notes.trim(),
  };
}

function useJobForm({ editingJob, onAddJob, onUpdateJob, onClose }) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingJob),
  );
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(editingJob);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      if (name === "status") {
        if (value !== "Interview") updatedForm.interviewDate = "";
        if (value !== "Offer") updatedForm.offerDate = "";
        if (value !== "Rejected") updatedForm.rejectedDate = "";
      }

      return updatedForm;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      form: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateJobForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const normalizedJob = normalizeJobData(formData);

    if (editingJob) {
      onUpdateJob({
        ...editingJob,
        ...normalizedJob,
      });
      onClose();
      return;
    }

    onAddJob(normalizedJob);
    onClose();
  }

  return {
    formData,
    errors,
    isEditing,
    handleChange,
    handleSubmit,
  };
}

export default useJobForm;
