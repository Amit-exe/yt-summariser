import React from "react";

function Navbar({ email, logout }) {
  return (
    <div className="sticky top-0 z-30 flex justify-between items-center bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/10 px-8 py-4">
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#29E9F5] via-[#7A64FF] to-[#FF508B] flex items-center justify-center">
          <span className="text-white text-sm">▶</span>
        </div>
        <span className="text-white font-semibold text-lg">YT Summariser</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm hidden md:block">{email}</span>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl text-sm font-medium text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
