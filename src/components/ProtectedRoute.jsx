import React, { useContext, useEffect } from "react";
import { authContext } from "../../contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(authContext);
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
