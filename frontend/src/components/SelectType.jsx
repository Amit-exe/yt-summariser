import React from "react";

function SelectType({ setSelected, selected }) {
  const options = [
    { id: "short", label: "⚡ Short", desc: "3-4 sentences" },
    { id: "detailed", label: "📋 Detailed", desc: "Full breakdown" },
    { id: "qna", label: "❓ Q&A", desc: "5 questions" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-slate-400 text-xs font-medium">
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
