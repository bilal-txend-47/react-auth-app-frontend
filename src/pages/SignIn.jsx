import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signinUser } from "../store/authSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-6">Welcome back</h1>

        <label className="block text-sm text-slate-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none"
        />

        <label className="block text-sm text-slate-300 mb-1">Password</label>
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 pr-16 rounded bg-slate-700 text-white outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-xs text-indigo-400">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold disabled:opacity-50"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-slate-400 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;