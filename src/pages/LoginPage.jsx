import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { loginUser } from "../services/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message || "Failed to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Login
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your JobFlow dashboard and manage your
            applications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <HiOutlineEnvelope className="h-5 w-5" />
              </span>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <HiOutlineLockClosed className="h-5 w-5" />
              </span>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <HiOutlineEyeSlash className="h-5 w-5" />
                ) : (
                  <HiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-gray-900 underline-offset-4 transition hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
