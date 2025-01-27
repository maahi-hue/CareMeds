import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MedicineCard from "../../../components/MedicineCard/MedicineCard";

const SingleCategory = () => {
  const location = useLocation();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/mediciness/${categoryName}`
        );
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [categoryName]);

  if (loading) return <p>Loading...</p>;
  if (!medicines.length) return <p>No medicines found for {categoryName}.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicines in {categoryName}</h1>
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

export default SingleCategory;
