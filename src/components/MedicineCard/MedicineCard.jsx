import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import MedicineModal from "../../components/Modal/MedicineModal";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const MedicineCard = ({ medicine }) => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleSelect = (medicine) => {
    if (user && user.email) {
      const {
        _id: medicineId,
        name,
        company,
        quantity,
        image,
        price,
      } = medicine;

      const cartItem = {
        medicineId,
        email: user.email,
        name,
        company,
        quantity,
        image,
        price,
      };
      axiosSecure
        .post(`/carts`, cartItem)
        .then((res) => {
          refetch();
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });

      alert(`Medicine "${name}" selected!`);
    } else {
      alert("Please login first.");
      navigate("/login", { state: { from: location } });
    }
  };

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  return (
    <>
      <tr key={medicine.id} className="border-b">
        <td className="px-4 py-2 text-sm text-gray-700">{medicine.name}</td>
        <td className="px-4 py-2 text-sm text-gray-700">
          {medicine.genericName}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700">{medicine.category}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{medicine.company}</td>
        <td className="px-4 py-2 text-sm text-gray-700">${medicine.price}</td>
        <td className="px-4 py-2 text-sm text-gray-700">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => handleViewDetails(medicine)}
          >
            Eye
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => handleSelect(medicine)}
          >
            Select
          </button>
        </td>
      </tr>
      {/* Medicine Details Modal */}
      {isModalOpen && (
        <MedicineModal
          medicine={selectedMedicine}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default MedicineCard;
