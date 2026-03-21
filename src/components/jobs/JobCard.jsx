function JobCard({ company, position, status, location }) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{position}</h3>
        <span className="text-sm text-gray-500">{status}</span>
      </div>

      <p className="mt-2 text-sm text-gray-600">{company}</p>
      <p className="mt-1 text-sm text-gray-500">{location}</p>
    </article>
  );
}

export default JobCard;
