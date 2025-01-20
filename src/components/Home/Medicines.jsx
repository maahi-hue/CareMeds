import { useState } from "react";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaEye, FaCartPlus } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import axios from "axios";

const Medicines = () => {
  const { user } = useAuth();
  const {
    data: medicines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/medicines`
      );
      return data;
    },
  });

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleSelect = (medicine) => {
    if (user && user.email) {
      const cartItem = {
        medicineId: medicine._id,
        email: user.email,
        name: medicine.name,
        price: medicine.price,
      };
      axiosSecure
        .post(`${import.meta.env.VITE_API_URL}/cart`, cartItem)
        .then((res) => {
          if (res.data.success) {
            alert("Item added to cart!");
          } else {
            alert("Failed to add item to cart.");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while adding the item to the cart.");
        });
    } else {
      alert("Please log in first.");
    }
  };

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading medicines.</p>;

  return (
    <Container>
      {medicines && medicines.length > 0 ? (
        <div className="pt-12">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={medicine.image || "https://via.placeholder.com/50"}
                      alt={`${medicine.name} image`}
                      className="w-12 h-12 object-cover mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {medicine.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${medicine.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1"
                      onClick={() => handleViewDetails(medicine)}
                    >
                      <FaEye />
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1"
                      onClick={() => handleSelect(medicine)}
                    >
                      <FaCartPlus />
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedMedicine && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setSelectedMedicine(null)}
            >
              <div
                className="bg-white rounded-lg p-6 w-96 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {selectedMedicine.name}
                </h2>
                <img
                  src={
                    selectedMedicine.image || "https://via.placeholder.com/150"
                  }
                  alt={`${selectedMedicine.name} image`}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <p>
                  <strong>Generic Name:</strong>{" "}
                  {selectedMedicine.genericName || "N/A"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedMedicine.description || "N/A"}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {selectedMedicine.category || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> ${selectedMedicine.price.toFixed(2)}
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => setSelectedMedicine(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No medicines available.</p>
      )}
    </Container>
  );
};

export default Medicines;
