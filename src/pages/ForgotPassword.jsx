import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-2">Reset password</h1>

        {submitted ? (
          <p className="text-slate-300 text-sm mb-4">
            If an account exists for <span className="font-semibold">{email}</span>,
            a password reset link has been sent.
          </p>
        ) : (
          <>
            <p className="text-slate-400 text-sm mb-6">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mb-4 px-3 py-2 rounded bg-slate-700 text-white outline-none"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold"
              >
                Send reset link
              </button>
            </form>
          </>
        )}

        <p className="text-slate-400 text-sm mt-4 text-center">
          <Link to="/signin" className="text-indigo-400">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;