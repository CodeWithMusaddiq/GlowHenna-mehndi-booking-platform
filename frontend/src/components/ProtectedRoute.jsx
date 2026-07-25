// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // ← Wait for localStorage check to finish before deciding
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-pink-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-xl">🌸</div>
          </div>
          <p className="text-gray-400 text-sm">Checking authentication…</p>
        </div>
      </div>
    );
  }

  // Only redirect AFTER loading is complete and user is still null
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;