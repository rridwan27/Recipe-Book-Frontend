import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 px-4">
      <div className="flex flex-col border border-secondary p-6 md:p-12 rounded-2xl items-center justify-center gap-6 w-full max-w-xl text-center">
        {/* Image First */}
        <img
          src="https://deep-image.ai/blog/content/images/2024/04/e8b03cd2-bbf1-4153-9e33-403a2e0f8ea3-generated.png"
          className="w-full max-w-md object-cover rounded-xl shadow-lg"
          alt="error"
        />

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold text-error">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-base text-gray-600">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Back Button */}
        <Link to="/" className="btn btn-secondary mt-4">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
