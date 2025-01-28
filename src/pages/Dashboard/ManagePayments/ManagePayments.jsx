import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const handleAcceptPayment = async (id) => {
    try {
      const res = await axiosSecure.patch(`/payments/${id}`);
      if (res.data.success) {
        refetch();
        alert("Payment status updated to paid.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center p-4">Payment Management</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${payment.price}
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {payment.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.status === "pending" ? (
                    <button
                      onClick={() => handleAcceptPayment(payment._id)}
                      className="px-4 py-2 hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold rounded"
                    >
                      Accept Payment
                    </button>
                  ) : (
                    <span className="text-gray-500">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayments;
