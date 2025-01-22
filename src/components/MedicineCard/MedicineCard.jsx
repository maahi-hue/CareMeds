const MedicineCard = ({ medicine }) => {
  const {
    name,
    genericName,
    description,
    image,
    category,
    company,
    quantity,
    price,
    discount,
  } = medicine;

  const discountedPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={name} className="h-48 w-full object-cover" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${discountedPrice}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm text-gray-600 italic">{genericName}</p>
        <p className="text-center">{description}</p>
        <p className="text-sm text-gray-500">Category: {category}</p>
        <p className="text-sm text-gray-500">Company: {company}</p>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        <p className="text-sm text-gray-500">
          Price per Unit: ${price} <br />
          Discount: {discount}%
        </p>
      </div>
    </div>
  );
};

export default MedicineCard;
