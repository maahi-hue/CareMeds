import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout";
import ErrorPage from "../ErrorPage";
import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import AddMedicine from "../AddMedicine";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "addmedicine",
        element: <AddMedicine></AddMedicine>,
      },
    ],
  },
]);
