import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useCategory from "../../../hooks/useCategory";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageCategory = () => {
  const [categories, , refetch] = useCategory();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteCategory = (category) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/categories/${category._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${category.name} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

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
      refetch();
      setIsModalOpen(false);
    } catch (err) {
      setErrorMessage("Failed to add the category. Please try again.");
      console.error("Error adding category:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>CareMeds | Manage Categories</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center p-4">All Categories</h1>

      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold"
        >
          Add Category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add a New Category</h2>
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
                <p className="text-green-600 text-sm font-medium">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-red-600 text-sm font-medium">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold flex justify-center items-center"
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
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Category Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={category.image} alt="Category" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{category.name}</td>
                  <td>
                    <Link to={`/dashboard/updateCategory/${category._id}`}>
                      <button className="btn hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold">
                        <FaEdit className="text-white"></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
