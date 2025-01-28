import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile({ displayName: name, photoURL });

      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold my-8">Update Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="photoURL">
            Profile Picture URL
          </label>
          <input
            id="photoURL"
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          className="btn bg-[#789DBC] text-white w-full font-bold hover:bg-[#FFE3E3] hover:text-[#1c1858]"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
