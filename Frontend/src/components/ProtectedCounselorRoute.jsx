import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedCounselorRoute = ({ children }) => {
  const token = localStorage.getItem("counselorToken");

  // No token → not a counselor
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Role check
    if (decoded.role !== "counselor") {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    // Token invalid or expired
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedCounselorRoute;
