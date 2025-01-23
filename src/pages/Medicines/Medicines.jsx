import { useEffect, useState } from "react";
import axios from "axios";
import MedicineCard from "../../components/MedicineCard/MedicineCard";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/medicines`
      );
      setMedicines(data);
    };
    fetchMedicines();
  }, []);

  return (
    <div className="container px-6 py-10 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Medicines</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Generic Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Company
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Price Per Unit
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicines;
