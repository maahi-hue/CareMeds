const MedicineModal = ({ medicine, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[800px] relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="flex gap-6">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-60 h-60 object-cover rounded"
            />
          </div>

          {/* Details Section */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold">{medicine.name}</h3>
            <p className="text-gray-600 mt-4">
              <strong>Generic Name:</strong> {medicine.genericName}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Description:</strong> {medicine.description}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Category:</strong> {medicine.category}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Company:</strong> {medicine.company}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Mass Unit:</strong> {medicine.quantity}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Price Per Unit:</strong> ${medicine.price}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Discount:</strong> {medicine.discount}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;
