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
import SellerRoute from "./SellerRoute";
import Errorpage from "../pages/Errorpage/Errorpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "medicines",
        element: <Medicines></Medicines>,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "contactUs",
        element: (
          <PrivateRoute>
            <ContactUs></ContactUs>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },

      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "sellerHome",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <SellerHome></SellerHome>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageMedicines",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageMedicines></ManageMedicines>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "sellerPayHistory",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <SellerPayHistory></SellerPayHistory>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "askAds",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AskForAdvertisement></AskForAdvertisement>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "adminHome",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminHome></AdminHome>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            {" "}
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "adminCategories",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCategory></ManageCategory>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "UpdateCategory/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateCategory></UpdateCategory>
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://server-plum-pi-16.vercel.app/categories/${params.id}`),
      },
      {
        path: "managePayments",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManagePayments></ManagePayments>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageBanner",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBannerAdvertise></ManageBannerAdvertise>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
]);
