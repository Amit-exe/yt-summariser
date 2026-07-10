import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState } from "react";
import removeMd from "remove-markdown";
import { useSelector } from "react-redux";

function Summary({ summary }) {
  const { lightTheme } = useSelector((state) => state.theme);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.summary);
  };

  const [isReading, setIsReading] = useState(false);

  const handleReadToggle = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(removeMd(summary.summary));
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      // 1. Fetch available system voices
      const voices = window.speechSynthesis.getVoices();

      // 2. High-priority female voice keywords across Windows, macOS/iOS, and Chrome
      const femaleKeywords = [
        "zira",
        "samantha",
        "aria",
        "google",
        "female",
        "hazel",
      ];

      // 3. Search for an English voice that matches our female keywords
      const targetVoice = voices.find((voice) => {
        const isEnglish = voice.lang.startsWith("en");
        const nameLower = voice.name.toLowerCase();
        const matchesKeyword = femaleKeywords.some((keyword) =>
          nameLower.includes(keyword),
        );
        return isEnglish && matchesKeyword;
      });

      // 4. Assign the voice if found, otherwise the browser safely uses its default
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      utterance.onend = () => setIsReading(false);

      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  return (
    <div
      className={`mt-4 border rounded-2xl overflow-hidden transition-colors duration-300 ${
        lightTheme
          ? "bg-white border-gray-200 shadow-sm"
          : "bg-white/5 border-white/10"
      }`}
    >
      {/* Summary header */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b ${
          lightTheme ? "border-gray-100" : "border-white/10"
        }`}
      >
        {/* Left — title + cached badge */}
        <div className="flex items-center gap-3">
          <span className={`font-medium text-sm ${lightTheme ? "text-gray-900" : "text-white"}`}>
            Summary
          </span>
          {summary.cached && (
            <span className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded-full">
              ⚡ Cached
            </span>
          )}
        </div>

        {/* Right — action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReadToggle}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              isReading
                ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                : lightTheme
                  ? "text-gray-500 hover:text-gray-900 border-gray-200 hover:border-gray-300"
                  : "text-slate-400 hover:text-white border-white/10 hover:border-white/20"
            }`}
          >
            {isReading ? "⏹ Stop" : "🔊 Read"}
          </button>

          <button
            onClick={handleCopy}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              lightTheme
                ? "text-gray-500 hover:text-gray-900 border-gray-200 hover:border-gray-300"
                : "text-slate-400 hover:text-white border-white/10 hover:border-white/20"
            }`}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Markdown content */}
      <div
        className={`px-6 py-6 max-w-none text-sm leading-relaxed ${
          lightTheme
            ? "prose prose-sm prose-gray"
            : `prose prose-invert prose-sm
              prose-headings:text-white prose-headings:font-semibold
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-strong:text-white
              prose-li:text-slate-300
              prose-code:text-[#29E9F5] prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
              prose-blockquote:border-[#7A64FF] prose-blockquote:text-slate-400
              prose-a:text-[#7A64FF] hover:prose-a:text-[#29E9F5]`
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {summary.summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Summary;
