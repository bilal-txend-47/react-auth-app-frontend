import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-3">Welcome</h1>
        <p className="text-slate-400 mb-8">
          Sign in to your account or create a new one to get started.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/signin"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-bold"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded font-bold"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;