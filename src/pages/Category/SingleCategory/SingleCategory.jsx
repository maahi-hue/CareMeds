import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleCategory = () => {
  const location = useLocation();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract category from the query parameters
  // const queryParams = new URLSearchParams(location.search);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicines.map((medicine) => (
          <div key={medicine._id} className="medicine-card">
            <img src={medicine.image} alt={medicine.name} />
            <h3>{medicine.name}</h3>
            <p>Price: ${medicine.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCategory;
