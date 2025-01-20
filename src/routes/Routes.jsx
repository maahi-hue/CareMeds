import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AddMedicine from "../pages/Dashboard/Seller/AddMedicine";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Medicines from "../components/Home/Medicines";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "shop",
        element: <Medicines></Medicines>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-medicine",
        element: (
          <PrivateRoute>
            <AddMedicine></AddMedicine>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
