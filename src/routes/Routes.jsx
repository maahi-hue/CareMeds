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
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
]);
