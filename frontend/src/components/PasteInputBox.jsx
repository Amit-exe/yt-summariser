import { useState } from "react";

export default function PasteInputBox({ inputValue, setInputValue }) {
  const [error, setError] = useState("");

  const handlePaste = async () => {
    try {
      setError("");
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch (err) {
      setError("Permission denied or clipboard read failed.");
    }
  };

  return (
    <div className="w-full">
      <div
        className={`flex rounded-xl overflow-hidden border transition-all duration-200 ${
          error
            ? "border-red-500/50"
            : "border-white/10 focus-within:border-[#7A64FF]"
        }`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste a YouTube URL..."
          className="w-full px-4 py-3 bg-white/5 text-white placeholder-slate-500 focus:outline-none text-sm"
        />
        <button
          type="button"
          onClick={handlePaste}
          className="bg-gradient-to-r from-[#29E9F5] via-[#7A64FF] to-[#FF508B] text-white px-5 py-3 text-sm font-semibold shrink-0 hover:opacity-90 transition-all"
        >
          Paste
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
}
