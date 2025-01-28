import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center text-center">
      <div className="max-w-lg">
        <h1 className="text-6xl font-extrabold text-[#141136] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#141136] mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-[#141136] mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <button className="btn bg-[#141136] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#2f3e46] transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Errorpage;
