import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const SellerPayHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/payment-history?seller=${user.email}`
        );
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payment history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [axiosSecure, user.email]);

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>CareMeds | Seller Payment History</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p>No payment history available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Buyer Email</th>
                <th className="border px-4 py-2">Medicine</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="border px-4 py-2">{payment.buyerEmail}</td>
                  <td className="border px-4 py-2">
                    {payment.medicines.map((med) => med.name).join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    {payment.medicines.reduce(
                      (sum, med) => sum + med.quantity,
                      0
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    $
                    {payment.medicines
                      .reduce((sum, med) => sum + med.price, 0)
                      .toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    $
                    {payment.medicines
                      .reduce((sum, med) => sum + med.price * med.quantity, 0)
                      .toFixed(2)}
                  </td>
                  <td
                    className={`border px-4 py-2 font-bold ${
                      payment.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SellerPayHistory;
