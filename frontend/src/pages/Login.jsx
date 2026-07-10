import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { lightTheme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        lightTheme ? "bg-gray-50" : "bg-[#0a0a1a]"
      }`}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#7A64FF] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#FF508B] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      {/* Card */}
      <div
        className={`relative w-full max-w-md backdrop-blur-sm border rounded-2xl p-8 shadow-2xl transition-colors duration-300 ${
          lightTheme
            ? "bg-white border-gray-200"
            : "bg-white/5 border-white/10"
        }`}
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#29E9F5] via-[#7A64FF] to-[#FF508B] mb-4">
            <span className="text-white text-xl">▶</span>
          </div>
          <h1 className={`text-2xl font-bold ${lightTheme ? "text-gray-900" : "text-white"}`}>
            Welcome back
          </h1>
          <p className={`text-sm mt-1 ${lightTheme ? "text-gray-500" : "text-slate-400"}`}>
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <div>
            <label className={`text-xs font-medium mb-1.5 block ${lightTheme ? "text-gray-500" : "text-slate-400"}`}>
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="amit@example.com"
              className={`w-full px-4 py-3 border rounded-xl placeholder-slate-500 focus:outline-none focus:border-[#7A64FF] focus:ring-1 focus:ring-[#7A64FF] transition-all ${
                lightTheme
                  ? "bg-gray-50 border-gray-200 text-gray-900"
                  : "bg-white/5 border-white/10 text-white"
              }`}
            />
          </div>
          <div>
            <label className={`text-xs font-medium mb-1.5 block ${lightTheme ? "text-gray-500" : "text-slate-400"}`}>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-xl placeholder-slate-500 focus:outline-none focus:border-[#7A64FF] focus:ring-1 focus:ring-[#7A64FF] transition-all ${
                lightTheme
                  ? "bg-gray-50 border-gray-200 text-gray-900"
                  : "bg-white/5 border-white/10 text-white"
              }`}
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#29E9F5] via-[#7A64FF] to-[#FF508B] hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Footer */}
        <p className={`text-center text-sm mt-6 ${lightTheme ? "text-gray-500" : "text-slate-400"}`}>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#7A64FF] hover:text-[#29E9F5] font-medium transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
