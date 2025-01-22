import { Link } from "react-router-dom";

const Categoryitem = ({ category }) => {
  const { _id, name, image } = category || {};
  return (
    <div
      className="relative border border-gray-500 w-full max-w-sm h-64 rounded-md shadow-md hover:scale-[1.05] transition-all overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col h-full p-4 text-white">
        <div className="flex-1">
          <h1 className="text-xl font-bold">{name}</h1>
        </div>

        <div>
          <Link
            to={`/medicines/category/${name}`}
            className="btn-view-medicines"
          >
            View Medicines
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categoryitem;
