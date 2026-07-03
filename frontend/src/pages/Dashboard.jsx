import { useState } from "react";
import PasteInputBox from "../components/PasteInputBox";
import { useAuth } from "../context/AuthContext";
import useSummarise from "../hooks/useSummarise";
import HistoryPanel from "../components/HistoryPanel";
import Navbar from "../components/Navbar";
import SelectType from "../components/SelectType";
import Summary from "../components/Summary";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [selected, setSelected] = useState("short");
  const { user, logout } = useAuth();
  const { getSummary, summary, error, isPending, setManualSummary } =
    useSummarise();

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#7A64FF] rounded-full blur-[140px] opacity-10 pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#29E9F5] rounded-full blur-[140px] opacity-10 pointer-events-none" />

      <Navbar email={user?.email} logout={logout} />
      <HistoryPanel onSelect={setManualSummary} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            YouTube Summariser
          </h1>
          <p className="text-slate-400 text-sm">
            Paste a YouTube URL and get an AI-generated summary instantly
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Input card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <label className="text-slate-400 text-xs font-medium mb-2 block">
            YouTube URL
          </label>
          <PasteInputBox inputValue={url} setInputValue={setUrl} />

          <div className="mt-4">
            <SelectType setSelected={setSelected} selected={selected} />
          </div>

          <button
            disabled={isPending}
            onClick={() => getSummary(url, selected)}
            type="button"
            className="mt-5 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#29E9F5] via-[#7A64FF] to-[#FF508B] hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Generating Summary...
              </span>
            ) : (
              "Get Summary"
            )}
          </button>
        </div>

        {/* Summary */}
        {summary && <Summary summary={summary} />}
      </div>
    </div>
  );
}

export default Dashboard;
