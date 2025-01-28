import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AskForAdvertisement = () => {
  const axiosSecure = useAxiosSecure();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [advertisementImage, setAdvertisementImage] = useState("");
  const [advertisementDescription, setAdvertisementDescription] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axiosSecure.get("/medicines/seller");
        setMedicines(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleAddAdvertisement = async () => {
    if (!advertisementImage || !advertisementDescription) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axiosSecure.post("/api/advertisements", {
        medicineId: selectedMedicine._id,
        image: advertisementImage,
        description: advertisementDescription,
      });

      if (response.status === 200) {
        alert("Advertisement added successfully");
        setShowModal(false);
        setAdvertisementImage("");
        setAdvertisementDescription("");
        fetchMedicines();
      }
    } catch (error) {
      console.error("Error adding advertisement:", error);
    }
  };

  const handleToggleSliderStatus = async (medicineId, isInSlider) => {
    try {
      const { data } = await axiosSecure.patch(`/medicines/${medicineId}`, {
        isInSlider,
      });
      setMedicines((prevMedicines) =>
        prevMedicines.map((medicine) =>
          medicine._id === medicineId
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
      <Helmet>
        <title>CareMeds | Ask for Advertisement</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Ask for Advertisement</h1>
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
              Slider Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(medicines) &&
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
                <td className="px-4 py-2">
                  {medicine.isInSlider ? "In Slider" : "Not in Slider"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleToggleSliderStatus(
                        medicine._id,
                        medicine.isInSlider
                      )
                    }
                    className={`px-4 py-2 rounded ${
                      medicine.isInSlider ? "bg-red-500" : "bg-green-500"
                    } text-white`}
                  >
                    {medicine.isInSlider
                      ? "Remove from Slider"
                      : "Add to Slider"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowModal(true)}
      >
        Add Advertisement
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <h2>Add Advertisement</h2>
            <div>
              <label className="block mb-2 text-sm">Medicine Image</label>
              <input
                type="text"
                value={advertisementImage}
                onChange={(e) => setAdvertisementImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Enter image URL"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm">Description</label>
              <textarea
                value={advertisementDescription}
                onChange={(e) => setAdvertisementDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Enter description for the advertisement"
              />
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddAdvertisement}
              >
                Add Advertisement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskForAdvertisement;
