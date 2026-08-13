import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../store/authSlice";

function getPasswordStrength(password) {
  if (password.length === 0) return { label: "", color: "" };
  if (password.length < 6) return { label: "Too short", color: "text-red-400" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "text-red-400" };
  if (score <= 2) return { label: "Medium", color: "text-yellow-400" };
  return { label: "Strong", color: "text-green-400" };
}

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state) => state.auth);

  const strength = getPasswordStrength(password);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    dispatch(signupUser({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-6">Create account</h1>

        <label className="block text-sm text-slate-300 mb-1">Full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none"
        />

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
            minLength={6}
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

        {password.length > 0 && (
          <p className={`text-xs mb-4 ${strength.color}`}>
            {strength.label} ({password.length} characters)
          </p>
        )}
        {password.length === 0 && <div className="mb-4" />}

        <label className="block text-sm text-slate-300 mb-1">
          Confirm password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none"
        />

        {(formError || error) && (
          <p className="text-red-400 text-sm mb-3">{formError || error}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold disabled:opacity-50"
        >
          {status === "loading" ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-slate-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-400">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;