import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
