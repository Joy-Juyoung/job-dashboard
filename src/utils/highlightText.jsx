function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, keyword) {
  if (!text) return "";
  if (!keyword || !keyword.trim()) return text;

  const escapedKeyword = escapeRegExp(keyword.trim());
  const regex = new RegExp(`(${escapedKeyword})`, "gi");

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === keyword.trim().toLowerCase() ? (
      <mark
        key={`${part}-${index}`}
        className="rounded bg-yellow-200 px-1 text-gray-900"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default highlightText;
