import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { _id, name, image } = category || {};
  return (
    <div
      className="relative border border-gray-500 w-64 h-48 rounded-2xl shadow-md hover:scale-105 transition-transform overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-2 p-4">
        <h1 className="text-lg font-bold">{name}</h1>
        <Link
          to={`/medicines/category/${name}`}
          className="btn bg-[#789DBC] font-bold hover:bg-[#FFE3E3] hover:text-[#1c1858] text-white px-4 py-2 rounded-lg"
        >
          View Medicines
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
