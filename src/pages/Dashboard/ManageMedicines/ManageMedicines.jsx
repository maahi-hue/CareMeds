import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageMedicines = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: medicines = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["medicines", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/medicinesss?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosSecure.get(`/categories`);
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [axiosSecure]);

  const handleMedicineAdded = () => {
    setIsModalOpen(false);
    refetch();
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading medicines...</p>
      </div>
    );
  }

  return (
    <div className="p-4 ">
      <h2 className="text-4xl text-center font-bold mb-6">Medicines</h2>

      <button
        className="btn px-4 py-2 rounded hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold w-full sm:w-auto"
        onClick={() => setIsModalOpen(true)}
      >
        Add Medicine
      </button>

      <div className="mt-6 overflow-x-auto ">
        {medicines.length > 0 ? (
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Generic Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Company</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Discount</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine._id}>
                  <td className="px-4 py-2 border">{medicine.name}</td>
                  <td className="px-4 py-2 border">{medicine.genericName}</td>
                  <td className="px-4 py-2 border">{medicine.category}</td>
                  <td className="px-4 py-2 border">{medicine.company}</td>
                  <td className="px-4 py-2 border">
                    ${medicine.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">
                    {medicine.discount || 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No medicines found. Please add new medicines.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-3/4 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Medicine</h3>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const image = form.image.value;
                const name = form.name.value;
                const genericName = form.genericName.value;
                const description = form.description.value;
                const category = form.category.value;
                const company = form.company.value;
                const quantity = parseInt(form.quantity.value);
                const price = parseFloat(form.price.value);
                const discount = parseFloat(form.discount.value);

                const seller = {
                  name: user?.displayName || "Anonymous Seller",
                  image: user?.photoURL || "https://via.placeholder.com/150",
                  email: user?.email || "noemail@example.com",
                };

                const formData = {
                  image,
                  name,
                  genericName,
                  description,
                  category,
                  company,
                  quantity,
                  price,
                  discount,
                  seller,
                };

                axiosSecure
                  .post(`/medicines`, formData)
                  .then(() => {
                    alert("Medicine added successfully");
                    handleMedicineAdded();
                    form.reset();
                  })
                  .catch((err) => {
                    console.error(err);
                    alert("An error occurred while adding the medicine.");
                  });
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Medicine Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="genericName"
                  >
                    Item Generic Name
                  </label>
                  <input
                    type="text"
                    name="genericName"
                    placeholder="Generic Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="description"
                  >
                    Short Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Short description about the medicine"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="image"
                  >
                    Image Upload URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL: https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No categories available
                      </option>
                    )}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="company"
                  >
                    Company
                  </label>
                  <input
                    name="company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-md hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold"
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;
