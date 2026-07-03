import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#29E9F5] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-[#7A64FF] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#29E9F5] via-[#7A64FF] to-[#FF508B] mb-4">
            <span className="text-white text-xl">▶</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="text-slate-400 text-sm mt-1">
            Start summarising YouTube videos
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
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Amit Kushwaha"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#7A64FF] focus:ring-1 focus:ring-[#7A64FF] transition-all"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="amit@example.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#7A64FF] focus:ring-1 focus:ring-[#7A64FF] transition-all"
            />
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#7A64FF] focus:ring-1 focus:ring-[#7A64FF] transition-all"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleRegister}
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#29E9F5] via-[#7A64FF] to-[#FF508B] hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#7A64FF] hover:text-[#29E9F5] font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
