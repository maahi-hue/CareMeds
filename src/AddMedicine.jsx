import { useState } from "react";
import AddMedicineForm from "./AddMedicineForm";
import useAuth from "./hooks/useAuth";
import useAxiosSecure from "./hooks/useAxiosSecure";

const AddMedicine = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const genericName = form.genericName.value;
    const description = form.description.value;
    const image = form.image.value;
    const category = form.category.value;
    const company = form.company.value;
    const massUnit = form.massUnit.value;
    const price = parseFloat(form.price.value);
    const discount = parseFloat(form.discount.value) || 0;

    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    const medicineData = {
      name,
      genericName,
      description,
      image,
      category,
      company,
      massUnit,
      price,
      discount,
      seller,
    };
    console.table(medicineData);

    try {
      const { data } = await axiosSecure.post("/medicines", medicineData);
      alert("added successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Form */}
      <AddMedicineForm
        handleSubmit={handleSubmit}
        loading={loading}
      ></AddMedicineForm>
    </div>
  );
};

export default AddMedicine;
