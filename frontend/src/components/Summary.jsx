import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

function Summary({ summary }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(summary.summary);
  };

  return (
    <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      {/* Summary header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium text-sm">Summary</span>
          {summary.cached && (
            <span className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded-full">
              ⚡ Cached
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
        >
          Copy
        </button>
      </div>

      {/* Markdown content */}
      <div
        className="px-6 py-6 prose prose-invert prose-sm max-w-none
        prose-headings:text-white prose-headings:font-semibold
        prose-p:text-slate-300 prose-p:leading-relaxed
        prose-strong:text-white
        prose-li:text-slate-300
        prose-code:text-[#29E9F5] prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
        prose-blockquote:border-[#7A64FF] prose-blockquote:text-slate-400
        prose-a:text-[#7A64FF] hover:prose-a:text-[#29E9F5]
      "
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
