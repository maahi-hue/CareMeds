import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBannerAdvertise = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axiosSecure.get("/medicines");

        if (Array.isArray(data)) {
          setMedicines(data);
        } else {
          console.error("Expected array, but got", data);
          setMedicines([]);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setMedicines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const toggleMedicineSlider = async (id, isInSlider) => {
    try {
      const { data } = await axiosSecure.patch(`/medicines/${id}`, {
        isInSlider: !isInSlider,
      });

      setMedicines((prevMedicines) =>
        prevMedicines.map((medicine) =>
          medicine._id === id
            ? { ...medicine, isInSlider: !isInSlider }
            : medicine
        )
      );
    } catch (error) {
      console.error("Error updating slider status:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Manage Banner Advertise</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Seller Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Add to Slide
            </th>
          </tr>
        </thead>
        <tbody>
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <tr key={medicine._id} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-16 h-16"
                  />
                </td>
                <td className="px-4 py-2">{medicine.name}</td>
                <td className="px-4 py-2">{medicine.description}</td>
                <td className="px-4 py-2">{medicine.sellerEmail}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      toggleMedicineSlider(medicine._id, medicine.isInSlider)
                    }
                    className={`px-4 py-2 rounded ${
                      medicine.isInSlider ? "bg-red-500" : "bg-green-500"
                    } text-white`}
                  >
                    {medicine.isInSlider ? "Remove from Slide" : "Add to Slide"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">
                No medicines available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBannerAdvertise;
