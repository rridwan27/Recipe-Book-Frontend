import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      if (email) {
        setSuccess("Password reset email sent. Check your inbox.");
        toast.success("Password reset link sent!");
        navigate("/auth/sign-in");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="flex justify-center items-center mt-48"
    >
      <div className="card bg-black/50 backdrop-blur-sm w-full auth-page-form max-w-sm rounded-2xl shrink-0 py-5 shadow-2xl">
        <h2 className="font-semibold text-2xl text-center my-4">
          Reset Your Password
        </h2>
        <form onSubmit={handleResetPassword} className="card-body">
          <div className="form-control">
            <label className="label my-2">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Send Reset Link
            </button>
          </div>

          <div className="text-center mt-4">
            <Link to="/auth/sign-in" className="text-secondary">
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
