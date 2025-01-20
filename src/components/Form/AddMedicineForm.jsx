import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";

const AddMedicineForm = ({ handleSubmit, loading }) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Item Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Item Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Medicine Name"
                required
              />
            </div>
            {/* Item Generic Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="genericName" className="block text-gray-600">
                Item Generic Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border rounded-md bg-white"
                name="genericName"
                id="genericName"
                type="text"
                placeholder="Generic Name"
                required
              />
            </div>
            {/* Short Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write a short description..."
                className="block rounded-md focus:lime-300 w-full h-24 px-4 py-3 text-gray-800 border bg-white"
                name="description"
                required
              ></textarea>
            </div>
            {/* Category Dropdown */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-md bg-white"
                name="category"
                id="category"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
            </div>
            {/* Company Dropdown */}
            <div className="space-y-1 text-sm">
              <label htmlFor="company" className="block text-gray-600">
                Company
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-md bg-white"
                name="company"
                id="company"
              >
                <option value="Pfizer">Pfizer</option>
                <option value="Johnson & Johnson">Johnson & Johnson</option>
                <option value="Merck">Merck</option>
                <option value="Roche">Roche</option>
              </select>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Item Mass Unit */}
            <div className="space-y-1 text-sm">
              <label htmlFor="massUnit" className="block text-gray-600">
                Item Mass Unit
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-md bg-white"
                name="massUnit"
                id="massUnit"
              >
                <option value="Mg">Mg</option>
                <option value="ML">ML</option>
              </select>
            </div>
            {/* Quantity Field */}
            <div className="space-y-1 text-sm">
              <label htmlFor="quantity" className="block text-gray-600">
                Quantity
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border rounded-md bg-white"
                name="quantity"
                id="quantity"
                type="number"
                placeholder="Enter Quantity"
                required
              />
            </div>
            {/* Per Unit Price */}
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Per Unit Price
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border rounded-md bg-white"
                name="price"
                id="price"
                type="number"
                placeholder="Price per unit"
                required
              />
            </div>
            {/* Discount Percentage */}
            <div className="space-y-1 text-sm">
              <label htmlFor="discount" className="block text-gray-600">
                Discount Percentage (Default 0)
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border rounded-md bg-white"
                name="discount"
                id="discount"
                type="number"
                placeholder="Discount %"
                defaultValue={0}
                min={0}
                max={100}
              />
            </div>
            {/* Image */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Image URL
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border rounded-md bg-white"
                name="image"
                id="image"
                type="text"
                placeholder="Image URL: https://example.com/image.jpg"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-gray-800"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Add Medicine"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddMedicineForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AddMedicineForm;
