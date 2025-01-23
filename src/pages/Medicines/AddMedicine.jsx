import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddMedicine = () => {
  const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e) => {
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
    };

    // Post request
    try {
      await axiosSecure.post(`/medicines`, formData);
      alert("Medicine added successfully");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the medicine.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Medicine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
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
          <label className="block text-sm font-medium mb-2" htmlFor="image">
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
          <label className="block text-sm font-medium mb-2" htmlFor="category">
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
          <label className="block text-sm font-medium mb-2" htmlFor="company">
            Company
          </label>
          <input
            name="company"
            className="w-full px-4 py-2 border border-gray-300
          rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity (e.g., 50)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="price">
            Per Unit Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Enter price per unit (e.g., 10.50)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="discount">
            Discount Percentage
          </label>
          <input
            type="number"
            step="0.1"
            name="discount"
            placeholder="Enter discount percentage (e.g., 5)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
