import React from "react";
import { useSelector } from "react-redux";

function SelectType({ setSelected, selected }) {
  const { lightTheme } = useSelector((state) => state.theme);

  const options = [
    { id: "short", label: "⚡ Short", desc: "3-4 sentences" },
    { id: "detailed", label: "📋 Detailed", desc: "Full breakdown" },
    { id: "qna", label: "❓ Q&A", desc: "5 questions" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className={`text-xs font-medium ${lightTheme ? "text-gray-500" : "text-slate-400"}`}>
        Summary Format
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const isActive = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={`flex flex-col items-center py-3 px-2 rounded-xl border transition-all duration-150 ${
                isActive
                  ? "bg-[#7A64FF]/20 border-[#7A64FF] text-white"
                  : lightTheme
                    ? "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300"
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs opacity-60 mt-0.5">{option.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectType;
