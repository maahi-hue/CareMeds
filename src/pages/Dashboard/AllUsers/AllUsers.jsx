import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUpdateRole = (user, newRole) => {
    axiosSecure.patch(`/users/${newRole}/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a ${newRole}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>CareMeds | Manage Users</title>
      </Helmet>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl font-bold">All Users</h2>
        <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2">
                  {user.role === "admin" ? (
                    <button className="btn btn-disabled bg-gray-500" disabled>
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateRole(user, "admin")}
                      className="btn hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold"
                    >
                      <FaUsers className="text-white text-2xl" />
                      Make Admin
                    </button>
                  )}
                  {user.role === "seller" ? (
                    <button className="btn btn-disabled bg-gray-500" disabled>
                      Seller
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateRole(user, "seller")}
                      className="btn hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold"
                    >
                      <FaUsers className="text-white text-2xl" />
                      Make Seller
                    </button>
                  )}

                  {user.role === "user" ? (
                    <button className="btn btn-disabled bg-gray-500" disabled>
                      User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateRole(user, "user")}
                      className="btn hover:bg-[#FFE3E3] hover:text-[#1c1858] bg-[#789DBC] text-white font-bold"
                    >
                      <FaUsers className="text-white text-xl" />
                      Make User
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost"
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

export default AllUsers;
