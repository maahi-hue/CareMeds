import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Provider/AuthProvider";

const Register = () => {
  const { handleGoogleLogin, handleRegister } = useContext(authContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      alert("Password length must be at least 6 characters.");

      return;
    }
    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    try {
      await handleRegister(email, password);
      const newUser = { name, email };
      const response = await fetch(
        "https://equi-sports-server-kappa.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      alert("Your account has been created.");
      navigate("/login");
    } catch (err) {
      // console.error("Registration error:", err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  const googleLoginHandler = () => {
    handleGoogleLogin()
      .then(() => {
        alert("You are now logged in with Google.");

        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        alert(err.message || "An error occurred during login.");
      });
  };

  return (
    <div className="w-5/12 mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-4 font-bold text-3xl text-center">
          Registration Form
        </h1>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              type="text"
              className="grow text-xs md:text-base"
              placeholder="Enter your name"
              name="name"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              type="email"
              className="grow text-xs md:text-base"
              placeholder="Enter your email"
              name="email"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Photo URL
            <input
              type="text"
              className="grow text-xs md:text-base"
              placeholder="https://example.com/photo.jpg"
              name="image"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 relative">
            Password
            <input
              type="password"
              className="grow text-xs md:text-base"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn bg-base-100 hover:bg-[#d68853] hover:text-[#1c1858] font-bold w-full mt-2"
        >
          Register
        </button>
        <p className="mt-2 font-semibold">
          Already registered?{" "}
          <NavLink className="text-red-600" to="/login">
            Login here
          </NavLink>
        </p>
        <p className="mt-2 font-semibold">
          Or sign up with{" "}
          <button className="text-red-600" onClick={googleLoginHandler}>
            Google Account
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
