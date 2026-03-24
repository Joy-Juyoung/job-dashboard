import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

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
  };
}

function AddJobForm({ onAddJob, onUpdateJob, onClose, editingJob }) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingJob),
  );
  const [errors, setErrors] = useState({});

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

  function validateForm() {
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
      nextErrors.rejectedDate =
        "Rejected date is required for Rejected status.";
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

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const normalizedJob = {
      company: formData.company.trim(),
      position: formData.position.trim(),
      status: formData.status,
      location: formData.location.trim(),
      appliedDate: formData.appliedDate,
      interviewDate:
        formData.status === "Interview" ? formData.interviewDate : "",
      offerDate: formData.status === "Offer" ? formData.offerDate : "",
      rejectedDate: formData.status === "Rejected" ? formData.rejectedDate : "",
    };

    if (editingJob) {
      onUpdateJob({
        ...editingJob,
        ...normalizedJob,
      });
      onClose();
      return;
    }

    onAddJob({
      id: Date.now(),
      ...normalizedJob,
    });
    onClose();
  }

  const isEditing = Boolean(editingJob);

  const inputBaseClass =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 focus:ring-2";
  const normalInputClass =
    "border-gray-200 focus:border-gray-400 focus:ring-gray-200";
  const errorInputClass =
    "border-red-300 focus:border-red-400 focus:ring-red-100";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit Application" : "Add New Application"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {isEditing
              ? "Update the details of your selected job application."
              : "Add a new job application to your dashboard."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close form"
          title="Close"
        >
          <HiOutlineXMark className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="company"
              className="text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Shopify"
              className={`${inputBaseClass} ${
                errors.company ? errorInputClass : normalInputClass
              }`}
            />
            {errors.company && (
              <p className="text-xs text-red-600">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="position"
              className="text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={`${inputBaseClass} ${
                errors.position ? errorInputClass : normalInputClass
              }`}
            />
            {errors.position && (
              <p className="text-xs text-red-600">{errors.position}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`${inputBaseClass} ${normalInputClass}`}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote or Calgary"
              className={`${inputBaseClass} ${
                errors.location ? errorInputClass : normalInputClass
              }`}
            />
            {errors.location && (
              <p className="text-xs text-red-600">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="appliedDate"
              className="text-sm font-medium text-gray-700"
            >
              Applied Date
            </label>
            <input
              id="appliedDate"
              name="appliedDate"
              type="date"
              value={formData.appliedDate}
              onChange={handleChange}
              className={`${inputBaseClass} ${
                errors.appliedDate ? errorInputClass : normalInputClass
              }`}
            />
            {errors.appliedDate && (
              <p className="text-xs text-red-600">{errors.appliedDate}</p>
            )}
          </div>

          {formData.status === "Interview" && (
            <div className="space-y-2">
              <label
                htmlFor="interviewDate"
                className="text-sm font-medium text-gray-700"
              >
                Interview Date
              </label>
              <input
                id="interviewDate"
                name="interviewDate"
                type="date"
                value={formData.interviewDate}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  errors.interviewDate ? errorInputClass : normalInputClass
                }`}
              />
              {errors.interviewDate && (
                <p className="text-xs text-red-600">{errors.interviewDate}</p>
              )}
            </div>
          )}

          {formData.status === "Offer" && (
            <div className="space-y-2">
              <label
                htmlFor="offerDate"
                className="text-sm font-medium text-gray-700"
              >
                Offer Date
              </label>
              <input
                id="offerDate"
                name="offerDate"
                type="date"
                value={formData.offerDate}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  errors.offerDate ? errorInputClass : normalInputClass
                }`}
              />
              {errors.offerDate && (
                <p className="text-xs text-red-600">{errors.offerDate}</p>
              )}
            </div>
          )}

          {formData.status === "Rejected" && (
            <div className="space-y-2">
              <label
                htmlFor="rejectedDate"
                className="text-sm font-medium text-gray-700"
              >
                Rejected Date
              </label>
              <input
                id="rejectedDate"
                name="rejectedDate"
                type="date"
                value={formData.rejectedDate}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  errors.rejectedDate ? errorInputClass : normalInputClass
                }`}
              />
              {errors.rejectedDate && (
                <p className="text-xs text-red-600">{errors.rejectedDate}</p>
              )}
            </div>
          )}
        </div>

        {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            {isEditing ? "Save Changes" : "Add Job"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddJobForm;
