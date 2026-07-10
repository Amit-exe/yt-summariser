import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggletheme } from "../Store/themeSlice";

function Navbar({ email, logout }) {
  const { lightTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <div
      className={`sticky top-0 z-30 flex justify-between items-center backdrop-blur-md px-8 py-4 border-b transition-colors duration-300 ${
        lightTheme
          ? "bg-white/80 border-gray-200"
          : "bg-[#0a0a1a]/80 border-white/10"
      }`}
    >
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#29E9F5] via-[#7A64FF] to-[#FF508B] flex items-center justify-center">
          <span className="text-white text-sm">▶</span>
        </div>
        <span
          className={`font-semibold text-lg ${lightTheme ? "text-gray-900" : "text-white"}`}
        >
          YT Summariser
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span
          className={`text-sm hidden md:block ${lightTheme ? "text-gray-500" : "text-slate-400"}`}
        >
          {email}
        </span>
        <button
          onClick={logout}
          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
            lightTheme
              ? "text-gray-700 border-gray-200 bg-gray-100 hover:bg-gray-200"
              : "text-white border-white/10 bg-white/5 hover:bg-white/10"
          }`}
        >
          Logout
        </button>

        {/* Theme Toggle Switch */}
        <button
          onClick={() => dispatch(toggletheme())}
          aria-label="Toggle theme"
          className={`relative flex items-center w-14 h-7 rounded-full border transition-all duration-300 focus:outline-none ${
            lightTheme
              ? "bg-gray-200 border-gray-300"
              : "bg-[#7A64FF]/30 border-white/20"
          }`}
        >
          {/* Icons row */}
          <span className="absolute left-1.5 text-xs leading-none">☀️</span>
          <span className="absolute right-1.5 text-xs leading-none">🌙</span>

          {/* Sliding thumb */}
          <span
            className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
              lightTheme
                ? "translate-x-0.5 bg-white"
                : "translate-x-7 bg-[#7A64FF]"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
