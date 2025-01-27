import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    return total + price * (item.quantity || 1);
  }, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The item has been removed from the cart.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete("/carts").then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cleared!",
              text: "All items have been removed from the cart.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleIncreaseQuantity = (id) => {
    axiosSecure.patch(`/carts/increase/${id}`).then(() => refetch());
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      axiosSecure.patch(`/carts/decrease/${id}`).then(() => refetch());
    } else {
      handleDelete(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Total Items: {cart.length}</h2>
          <h2 className="text-2xl font-bold">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
        </div>
        <div>
          {cart.length ? (
            <button
              onClick={handleClearCart}
              className="btn btn-warning text-white"
            >
              Clear All
            </button>
          ) : (
            <button disabled className="btn btn-warning text-white">
              Clear All
            </button>
          )}
          {cart.length ? (
            <Link to="/dashboard/payment">
              <button className="btn btn-primary ml-4">Pay</button>
            </Link>
          ) : (
            <button disabled className="btn btn-primary ml-4">
              Pay
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Price/Unit</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.company}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() =>
                        handleDecreaseQuantity(item._id, item.quantity)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleIncreaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
