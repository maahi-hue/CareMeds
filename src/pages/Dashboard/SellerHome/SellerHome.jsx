import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const SellerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["seller-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const revenue = stats.reduce((acc, item) => acc + item.price, 0);
  const orders = stats.length;
  const paidTotal = stats
    .filter((item) => item.status === "paid")
    .reduce((acc, item) => acc + item.price, 0);
  const pendingTotal = stats
    .filter((item) => item.status === "pending")
    .reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-4">
      <Helmet>
        <title>CareMeds | Seller Home</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">
        Hi, Welcome {user?.displayName ? user.displayName : "Seller"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-white shadow-lg p-4 rounded-lg text-center">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-4xl mx-auto text-blue-500" />
          </div>
          <div className="stat-title text-lg font-medium text-gray-600">
            Revenue
          </div>
          <div className="stat-value text-2xl font-bold text-gray-800">
            ${revenue.toFixed(2)}
          </div>
        </div>

        <div className="stat bg-white shadow-lg p-4 rounded-lg text-center">
          <div className="stat-figure text-secondary">
            <FaShoppingCart className="text-4xl mx-auto text-red-500" />
          </div>
          <div className="stat-title text-lg font-medium text-gray-600">
            Orders
          </div>
          <div className="stat-value text-2xl font-bold text-gray-800">
            {orders}
          </div>
        </div>

        <div className="stat bg-white shadow-lg p-4 rounded-lg text-center">
          <div className="stat-figure text-secondary">
            <FaMoneyBillWave className="text-4xl mx-auto text-purple-500" />
          </div>
          <div className="stat-title text-lg font-medium text-gray-600">
            Paid Total
          </div>
          <div className="stat-value text-2xl font-bold text-gray-800">
            ${paidTotal.toFixed(2)}
          </div>
        </div>

        <div className="stat bg-white shadow-lg p-4 rounded-lg text-center">
          <div className="stat-figure text-secondary">
            <FaMoneyBillWave className="text-4xl mx-auto text-orange-500" />
          </div>
          <div className="stat-title text-lg font-medium text-gray-600">
            Pending Total
          </div>
          <div className="stat-value text-2xl font-bold text-gray-800">
            ${pendingTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
