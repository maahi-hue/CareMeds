import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = e.target;
    const image = form.image.value.trim();
    const name = form.name.value.trim();

    const formData = {
      image,
      name,
    };

    try {
      await axiosSecure.post(`/categories`, formData);
      setSuccessMessage("Category added successfully!");
      form.reset();
    } catch (err) {
      setErrorMessage("Failed to add the category. Please try again.");
      console.error("Error adding category:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="categoryName"
          >
            Category Name
          </label>
          <input
            type="text"
            name="name"
            id="categoryName"
            placeholder="e.g., Antibiotic"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="categoryImage"
          >
            Category Image URL
          </label>
          <input
            type="text"
            name="image"
            id="categoryImage"
            placeholder="e.g., https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {successMessage && (
          <p className="text-green-600 text-sm font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 100 8V4z"
              ></path>
            </svg>
          ) : (
            "Add Category"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
