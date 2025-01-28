import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
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
import ManagePayments from "../pages/Dashboard/ManagePayments/ManagePayments";
import SellerHome from "../pages/Dashboard/SellerHome/SellerHome";
import ManageMedicines from "../pages/Dashboard/ManageMedicines/ManageMedicines";
import SellerPayHistory from "../pages/Dashboard/SellerPayHistory/SellerPayHistory";
import UpdateProfile from "../pages/Shared/Navbar/UpdateProfile";
import DiscountMedicines from "../pages/Home/DiscountMedicines/DiscountMedicines";
import ManageBannerAdvertise from "../components/Dashboard/ManageBannerAdvertise/ManageBannerAdvertise";
import AskForAdvertisement from "../pages/Dashboard/AskForAdvertisement/AskForAdvertisement";
import DashboardRedirect from "../pages/Dashboard/DashboardRedirects/DashboardRedirects";
import ContactUs from "../pages/Home/ContactUs/ContactUs";

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
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "medicines",
        element: <Medicines></Medicines>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "discount",
        element: <DiscountMedicines></DiscountMedicines>,
      },
      {
        path: "/medicines/category/:categoryName",
        element: <SingleCategory></SingleCategory>,
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
        index: true,
        element: <DashboardRedirect />,
      },

      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
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
        path: "askAds",
        element: <AskForAdvertisement></AskForAdvertisement>,
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
      {
        path: "manageBanner",
        element: <ManageBannerAdvertise></ManageBannerAdvertise>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
]);
