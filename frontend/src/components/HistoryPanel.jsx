import { useState } from "react";
import useHistory from "../hooks/useHistory";
import { useSelector } from "react-redux";

function HistoryPanel({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const { history, isLoading } = useHistory();
  const { lightTheme } = useSelector((state) => state.theme);

  const typeColors = {
    short: "border-[#7A64FF] text-[#7A64FF] bg-[#7A64FF]/10",
    detailed: "border-[#FF508B] text-[#FF508B] bg-[#FF508B]/10",
    qna: "border-[#29E9F5] text-[#29E9F5] bg-[#29E9F5]/10",
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full w-72 border-r shadow-2xl transition-all duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${
        lightTheme
          ? "bg-gray-50 border-gray-200"
          : "bg-[#0d0d20] border-white/10"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="absolute -right-9 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#29E9F5] via-[#7A64FF] to-[#FF508B] text-white px-2 py-5 rounded-r-xl text-sm font-bold shadow-lg"
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Header */}
      <div
        className={`px-4 py-5 border-b ${lightTheme ? "border-gray-200" : "border-white/10"}`}
      >
        <h2 className={`font-semibold text-sm ${lightTheme ? "text-gray-900" : "text-white"}`}>
          History
        </h2>
        <p className={`text-xs mt-0.5 ${lightTheme ? "text-gray-400" : "text-slate-500"}`}>
          Your past summaries
        </p>
      </div>

      {/* List */}
      <div className="overflow-y-auto h-full pb-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className={`text-sm ${lightTheme ? "text-gray-400" : "text-slate-500"}`}>
              Loading...
            </span>
          </div>
        ) : (history || []).length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <span className={`text-sm ${lightTheme ? "text-gray-400" : "text-slate-500"}`}>
              No history yet
            </span>
          </div>
        ) : (
          <ul className="p-3 flex flex-col gap-2">
            {(history || []).map((e) => (
              <li
                key={e.id}
                onClick={() => {
                  onSelect(e);
                  setIsOpen(false);
                }}
                className={`cursor-pointer p-3 rounded-xl border transition-all duration-150 ${
                  typeColors[e.summary_type]
                } ${
                  lightTheme
                    ? "hover:bg-gray-100"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {/* URL */}
                <p className={`text-xs truncate mb-2 ${lightTheme ? "text-gray-600" : "text-slate-300"}`}>
                  {e.summary_title || e.video_url.split("//")[1]}
                </p>

                {/* Badge + Date */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[e.summary_type]}`}
                  >
                    {e.summary_type}
                  </span>
                  <span className={`text-xs ${lightTheme ? "text-gray-400" : "text-slate-500"}`}>
                    {new Date(e.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HistoryPanel;
