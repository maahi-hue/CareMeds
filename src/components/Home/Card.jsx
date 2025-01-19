import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ medicine }) => {
  const {
    name,
    _id,
    genericName,
    description,
    image,
    category,
    company,
    massUnit,
    price,
    discount,
  } = medicine || {};

  // Calculate the discounted price if a discount is available
  const discountedPrice = discount
    ? (price - (price * discount) / 100).toFixed(2)
    : price;

  return (
    <Link
      to={`/medicine/${_id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Image */}
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
        >
          <img
            className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
            src={image || "https://via.placeholder.com/150"} // Fallback image
            alt={name || "Medicine Image"}
          />
        </div>

        {/* Name */}
        <div className="font-semibold text-lg">
          {name || "Unknown Medicine"}
        </div>

        {/* Generic Name */}
        <div className="text-gray-600">
          <strong>Generic Name:</strong> {genericName || "N/A"}
        </div>

        {/* Description */}
        <div className="text-gray-500 text-sm">
          <strong>Description:</strong>{" "}
          {description || "No description available."}
        </div>

        {/* Category */}
        <div className="text-gray-600">
          <strong>Category:</strong> {category || "N/A"}
        </div>

        {/* Company */}
        <div className="text-gray-600">
          <strong>Company:</strong> {company || "N/A"}
        </div>

        {/* Mass Unit */}
        <div className="text-gray-600">
          <strong>Mass:</strong> {massUnit ? `${massUnit} mg/ml` : "N/A"}
        </div>

        {/* Price */}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            <strong>Price:</strong> $
            {discount ? `${discountedPrice} (Discounted)` : price}
          </div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  medicine: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    genericName: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    company: PropTypes.string,
    massUnit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    price: PropTypes.number,
    discount: PropTypes.number,
  }),
};

export default Card;
