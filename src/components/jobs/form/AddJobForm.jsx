import { useEffect, useRef } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";
import FormSelect from "./FormSelect";
import useJobForm from "../../../hooks/useJobForm";

const statusOptions = [
  { value: "Applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

function AddJobForm({ onAddJob, onUpdateJob, onClose, editingJob }) {
  const companyInputRef = useRef(null);

  const { formData, errors, isEditing, handleChange, handleSubmit } =
    useJobForm({
      editingJob,
      onAddJob,
      onUpdateJob,
      onClose,
    });

  useEffect(() => {
    if (companyInputRef.current) {
      companyInputRef.current.focus();
    }
  }, [editingJob]);

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
          <FormInput
            ref={companyInputRef}
            id="company"
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Shopify"
            error={errors.company}
          />

          <FormInput
            id="position"
            name="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            error={errors.position}
          />

          <FormSelect
            id="status"
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
          />

          <FormInput
            id="location"
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Remote or Calgary"
            error={errors.location}
          />

          <FormDateInput
            id="appliedDate"
            name="appliedDate"
            label="Applied Date"
            value={formData.appliedDate}
            onChange={handleChange}
            error={errors.appliedDate}
          />

          {formData.status === "Interview" && (
            <FormDateInput
              id="interviewDate"
              name="interviewDate"
              label="Interview Date"
              value={formData.interviewDate}
              onChange={handleChange}
              error={errors.interviewDate}
            />
          )}

          {formData.status === "Offer" && (
            <FormDateInput
              id="offerDate"
              name="offerDate"
              label="Offer Date"
              value={formData.offerDate}
              onChange={handleChange}
              error={errors.offerDate}
            />
          )}

          {formData.status === "Rejected" && (
            <FormDateInput
              id="rejectedDate"
              name="rejectedDate"
              label="Rejected Date"
              value={formData.rejectedDate}
              onChange={handleChange}
              error={errors.rejectedDate}
            />
          )}

          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700"
            >
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Technical interview scheduled next week"
              rows={4}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            <div className="flex items-center justify-between">
              {errors.notes && (
                <p className="text-xs text-red-600">{errors.notes}</p>
              )}
              <p className="text-xs text-gray-400 text-right">
                {formData.notes.length}/500
              </p>
            </div>
          </div>
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
