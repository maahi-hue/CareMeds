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
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine}></MedicineCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medicines;
