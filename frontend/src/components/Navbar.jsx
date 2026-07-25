
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-green-700 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">Glow Henna Artist Finder 🌿</h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/artists" className="hover:text-gray-200">Artists</Link>
          <Link to="/designs" className="hover:text-gray-200">Designs</Link>
          <Link to="/price-estimator" className="hover:text-gray-200">Price Estimator</Link>
          <Link to="/festival" className="hover:text-gray-200">Festival</Link>
          <Link to="/design-suggestion" className="hover:text-gray-200">AI Suggestion</Link>

          {!user ? (
            <Link to="/login" className="hover:text-gray-200">Login</Link>
          ) : (
            <button
              onClick={logout}
              className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;