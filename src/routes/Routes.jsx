import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Order from "../pages/Order/Order/Order";
import AddCategory from "../pages/Category/AddCategory/AddCategory";
import SingleCategory from "../pages/Category/SingleCategory/SingleCategory";
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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import ManagePayments from "../pages/Dashboard/ManagePayments/ManagePayments";
import SellerHome from "../pages/Dashboard/SellerHome/SellerHome";
import ManageMedicines from "../pages/Dashboard/ManageMedicines/ManageMedicines";
import SellerPayHistory from "../pages/Dashboard/SellerPayHistory/SellerPayHistory";

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
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      
      {
        path: "sellerHome",
        element: <SellerHome></SellerHome>,
      },
      {
        path: "manageMedicines",
        element: <ManageMedicines></ManageMedicines>,
      },
      {
        path: "sellerPayHistory",
        element: <SellerPayHistory></SellerPayHistory>,
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
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
        path: "UpdateCategory/:id",
        element: <UpdateCategory></UpdateCategory>,
        loader: ({ params }) =>
          fetch(`http://localhost:9000/categories/${params.id}`),
      },
      {
        path: "managePayments",
        element: <ManagePayments></ManagePayments>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
]);
