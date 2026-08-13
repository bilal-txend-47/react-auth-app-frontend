import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../store/authSlice";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none"
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

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