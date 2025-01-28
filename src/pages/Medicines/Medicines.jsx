import { useEffect, useState } from "react";
import MedicineCard from "../../components/MedicineCard/MedicineCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Medicines = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [sortedMedicines, setSortedMedicines] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortMedicines = (order) => {
    const sorted = [...sortedMedicines].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setSortedMedicines(sorted);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      const { data } = await axiosPublic.get(`/medicines?search=${search}`);
      const formattedData = data.map((medicine) => ({
        ...medicine,
        price: parseFloat(medicine.price),
      }));
      setSortedMedicines(formattedData);
    };
    fetchMedicines();
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mx-auto container px-6 py-10">
      <Helmet>
        <title>CareMeds | Medicines</title>
      </Helmet>
      <h1 className="text-4xl text-center font-bold mb-6">Medicines</h1>
      <div className="flex justify-between">
        <div className="w-1/3 flex p-1 my-4 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={handleSearchChange}
            placeholder="Enter Medicine Name"
            aria-label="Enter Medicine Name"
          />

          <button className="px-1 flex-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#141136] rounded-md hover:bg-[#FFE3E3] hover:text-[#1c1858] focus:bg-[#141136] focus:outline-none">
            Search
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <div className="relative inline-block">
            <button
              className="btn bg-[#84a98c] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#354f52] hover:text-[#cad2c5]"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Sort
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 ml-2 inline-block transform transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[#FFE3E3] hover:text-[#1c1858]"
                    onClick={() => sortMedicines("asc")}
                  >
                    Price: Low to High
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[#FFE3E3] hover:text-[#1c1858]"
                    onClick={() => sortMedicines("desc")}
                  >
                    Price: High to Low
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

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
            {sortedMedicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicines;
