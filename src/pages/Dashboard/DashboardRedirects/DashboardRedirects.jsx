import { Navigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useSeller from "../../../hooks/useSeller";

const DashboardRedirect = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();

  if (isAdmin) {
    return <Navigate to="adminHome" replace />;
  }
  if (isSeller) {
    return <Navigate to="sellerHome" replace />;
  }
  return <Navigate to="paymentHistory" replace />;
};

export default DashboardRedirect;
