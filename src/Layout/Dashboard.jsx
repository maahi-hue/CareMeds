import {
  FaAd,
  FaEnvelope,
  FaHome,
  FaList,
  FaMoneyCheck,
  FaSalesforce,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();

  return (
    <div className="flex flex-col lg:flex-row">
  
      <div className="w-full lg:w-64 bg-[#789DBC] text-white font-bold text-xl lg:text-3xl lg:min-h-screen">
        <ul className="menu p-4">
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome className="inline-block mr-2" />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers className="inline-block mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/adminCategories">
                  <FaList className="inline-block mr-2" />
                  Manage Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/managePayments">
                  <FaMoneyCheck className="inline-block mr-2" />
                  Payment Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/salesReport">
                  <FaSalesforce className="inline-block mr-2" />
                  Sales Report
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBanner">
                  <FaAd className="inline-block mr-2" />
                  Manage Advertisements
                </NavLink>
              </li>
            </>
          )}

          {isSeller && !isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/sellerHome">
                  <FaHome className="inline-block mr-2" />
                  Seller Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageMedicines">
                  <FaList className="inline-block mr-2" />
                  Manage Medicines
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/sellerPayHistory">
                  <FaSalesforce className="inline-block mr-2" />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/askAds">
                  <FaSalesforce className="inline-block mr-2" />
                  Ask For Advertisement
                </NavLink>
              </li>
            </>
          )}

          {!isAdmin && !isSeller && (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome className="inline-block mr-2" />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList className="inline-block mr-2" />
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome className="inline-block mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/medicines">
              <FaSearch className="inline-block mr-2" />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope className="inline-block mr-2" />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
     
      <div className="flex-1 p-4 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
