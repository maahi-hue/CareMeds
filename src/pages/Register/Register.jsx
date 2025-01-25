import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value; // Get the selected role
    const imageFile = form.image.files[0];

    try {
      // Upload image if provided
      let imageUrl = "https://via.placeholder.com/150"; // Default placeholder image
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOSTING_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imgData = await res.json();
        if (imgData.success) {
          imageUrl = imgData.data.display_url;
        }
      }

      // User registration
      const result = await createUser(email, password);

      // Save username & profile photo
      await updateUserProfile(name, imageUrl);

      // Save user data (including role) to the database
      const userData = {
        name,
        email,
        role,
        image: imageUrl,
      };
      await fetch("http://localhost:9000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      navigate("/");
      alert("Signup Successful");
    } catch (err) {
      console.error(err);
      alert(err?.message);
    }
  };

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      alert("Signup Successful");
    } catch (err) {
      console.error(err);
      alert(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to CareMeds</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-2 text-sm">
                Select Role
              </label>
              <select
                name="role"
                id="role"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 text-gray-900"
                required
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="bg-white w-full rounded-md py-3">
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm">OR</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-gray-700 text-gray-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
