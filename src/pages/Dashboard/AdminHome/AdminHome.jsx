import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaBook,
  FaDollarSign,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="p-4">
      <Helmet>
        <title>CareMeds | Admin Home</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">
        Hi, Welcome {user?.displayName ? user.displayName : "Back"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="stat bg-white shadow-lg p-4 rounded-lg text-center">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-4xl mx-auto text-blue-500" />
          </div>
          <div className="stat-title text-lg font-medium text-gray-600">
            Revenue
          </div>
          <div className="stat-value text-2xl font-bold text-gray-800">
            ${stats.revenue}
          </div>
        </div>

        <div className="stat bg-white shadow-lg p-4 rounded-lg text-center">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-4xl mx-auto text-green-500" />
          </div>
          <div className="stat-title text-lg font-medium text-gray-600">
            Users
          </div>
          <div className="stat-value text-2xl font-bold text-gray-800">
            {stats.users}
          </div>
        </div>

        <div className="stat bg-white shadow-lg p-4 px-2 rounded-lg text-center">
          <div className="stat-figure text-secondary">
            <FaBook className="text-4xl mx-auto text-yellow-500" />
          </div>
          <div className="stat-title text-lg font-medium text-gray-600">
            Categories
          </div>
          <div className="stat-value text-2xl font-bold text-gray-800">
            {stats.categories}
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
            {stats.orders}
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
            ${stats.paidTotal}
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
            ${stats.pendingTotal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
