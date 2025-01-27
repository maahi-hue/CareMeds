import {
  FaAd,
  FaEnvelope,
  FaHome,
  FaList,
  FaMoneyCheck,
  FaSalesforce,
  FaSearch,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/adminCategories">
                  <FaList />
                  Manage Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/managePayments">
                  <FaMoneyCheck />
                  Payment Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/">
                  <FaSalesforce />
                  Sales Report
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageAds">
                  <FaAd />
                  Manage Advertisements
                </NavLink>
              </li>
            </>
          )}

          {isSeller && !isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/sellerHome">
                  <FaHome />
                  Seller Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageMedicines">
                  <FaList />
                  Manage Medicines
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/sellerPayHistory">
                  <FaSalesforce />
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          {!isAdmin && !isSeller && (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart />
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList />
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/medicines">
              <FaSearch />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
