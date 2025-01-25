import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Order from "../pages/Order/Order/Order";
import AddCategory from "../pages/Category/AddCategory/AddCategory";
import SingleCategory from "../pages/Category/SingleCategory/SingleCategory";
import AddMedicine from "../pages/Medicines/AddMedicine";
import Medicines from "../pages/Medicines/Medicines";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Cart from "../pages/Dashboard/Cart/Cart";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import ManageCategory from "../pages/Dashboard/ManageCategory/ManageCategory";
import UpdateCategory from "../pages/Dashboard/updateCategory/updateCategory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "medicines",
        element: <Medicines></Medicines>,
      },
      {
        path: "add-category",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "add-medicine",
        element: <AddMedicine></AddMedicine>,
      },
      {
        path: "/medicines/category/:categoryName",
        element: <SingleCategory></SingleCategory>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "adminCategories",
        element: <ManageCategory></ManageCategory>,
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "UpdateCategory/:id",
        element: <UpdateCategory></UpdateCategory>,
        loader: ({ params }) =>
          fetch(`http://localhost:9000/categories/${params.id}`),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
]);
