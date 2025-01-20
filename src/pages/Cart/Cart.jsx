import { useContext, useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      fetchCart();
    }
  }, [user, loading]);

  const fetchCart = async () => {
    const { user } = useAuth();
    if (!user?.token) {
      throw new Error("User not authenticated");
    }
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${user.token}`, // Add token to headers
      },
    });
    return data;
  };

  const { data: cartItems, error, isLoading } = useQuery(["cart"], fetchCart);

  if (loading) {
    return (
      <Container>
        <p>Loading cart...</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <p>Please log in to view your cart.</p>
      </Container>
    );
  }

  return (
    <Container>
      {fetchError ? (
        <p className="text-red-500">{fetchError}</p>
      ) : cart && cart.length > 0 ? (
        <div className="pt-12">
          {/* Cart Items Table */}
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.medicineId._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={
                        item.medicineId.image ||
                        "https://via.placeholder.com/50"
                      }
                      alt={item.medicineId.name}
                      className="w-12 h-12 object-cover mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.medicineId.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${item.medicineId.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleRemove(item.medicineId._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No items in the cart</p>
      )}
    </Container>
  );
};

export default Cart;
