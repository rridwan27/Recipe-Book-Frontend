import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoFastFoodOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, googleSignIn, setLoading } = use(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Must contain at least one lowercase letter");
      return;
    }

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Logged in successfully");
      })
      .catch((error) => {
        let errorMessage = "Incorrect email or password";

        setError(errorMessage);
        setLoading(false);
        toast.error(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        let photoURL = user.photoURL || "";
        if (photoURL.length > 512) {
          photoURL = photoURL.substring(0, 512);
          console.warn("Trimmed photo URL to 512 characters");
        }

        const userProfile = {
          name: user.displayName,
          email: user.email,
          photo: photoURL,
          creationTime: user.metadata?.creationTime,
          lastSignInTime: user.metadata?.lastSignInTime,
        };

        console.log("userProfile", userProfile);

        fetch("https://server-recipe-book-theta.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId || data.message === "User exists") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Login successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(`${location.state ? location.state : "/"}`);
            }
          })
          .catch((error) => {
            console.error("Error saving user:", error);
            toast.error("Error saving user data");
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="flex justify-center items-center  mb-16 mt-16 md:mt-48"
    >
      <div className="card bg-black/50 backdrop-blur-sm w-full max-w-sm rounded-2xl shrink-0 py-5 shadow-2xl auth-page-form">
        <div className="flex items-center justify-center gap-3 my-3">
          <IoFastFoodOutline size={36} className="text-violet-600" />
          <h1 className="text-3xl font-semibold title">SpiceSpoon</h1>
        </div>
        <h2 className="font-semibold text-2xl text-center">
          Sign In to your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-secondary btn-outline w-full"
            >
              <FcGoogle size={24} /> Sign In with Google
            </button>
            <div className="flex items-center w-full my-4">
              <hr className="w-full dark:text-gray-600" />
              <p className="px-3 dark:text-gray-100 auth-page-or">OR</p>
              <hr className="w-full dark:text-gray-600" />
            </div>

            {/* email */}
            <label className="label text-white">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* password */}
            <label className="label text-white">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}

            <div>
              <Link to="/auth/forgot-password" className="text-secondary">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-secondary mt-4">
              Sign In
            </button>
            <p className="font-semibold pt-2 text-center text-lg">
              Don't have an account?{" "}
              <Link className="text-secondary" to="/auth/sign-up">
                SignUp
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </motion.div>
  );
};
export default SignIn;
