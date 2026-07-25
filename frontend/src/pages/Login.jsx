// // // import { useState, useContext } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import api from "../services/api";
// // // import { AuthContext } from "../context/AuthContext";

// // // function Login() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const { login } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const { data } = await api.post("/auth/login", {
// // //         email,
// // //         password,
// // //       });

// // //       login(data);
// // //       navigate("/");
// // //     } catch (error) {
// // //       alert(error.response?.data?.message || "Login failed");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex justify-center mt-20">
// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className="bg-white p-8 rounded shadow-md w-96"
// // //       >
// // //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

// // //         <input
// // //           type="email"
// // //           placeholder="Email"
// // //           className="w-full mb-4 p-2 border rounded"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           required
// // //         />

// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           className="w-full mb-4 p-2 border rounded"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           required
// // //         />

// // //         <button className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">
// // //           Login
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default Login;
// // import { useState, useContext } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import api from "../services/api";
// // import { AuthContext } from "../context/AuthContext";

// // function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const { login } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const { data } = await api.post("/auth/login", {
// //         email,
// //         password,
// //       });

// //       login(data);
// //       navigate("/");
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center mt-20">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded shadow-md w-96"
// //       >
// //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           className="w-full mb-4 p-2 border rounded"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           className="w-full mb-4 p-2 border rounded"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />

// //         <button className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">
// //           Login
// //         </button>

// //         {/* 👇 NEW: Register Link 👇 */}
// //         <div className="text-center mt-4">
// //           <p className="text-gray-600 text-sm">
// //             Don't have an account?{' '}
// //             <Link 
// //               to="/register" 
// //               className="text-green-700 hover:text-green-800 font-semibold underline"
// //             >
// //               Register here
// //             </Link>
// //           </p>
// //         </div>
// //         {/* 👆 NEW: Register Link 👆 */}

// //       </form>
// //     </div>
// //   );
// // }

// // export default Login;

// import { useState, useContext } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import api from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // If user was redirected from a protected page (e.g. /booking/123),
//   // send them back there after login instead of home
//   const from = location.state?.from?.pathname || "/";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       // Try /api/auth/login first (standard Express setup)
//       const { data } = await api.post("/api/auth/login", { email, password });

//       // data = { _id, fullName, email, token }
//       // Store token separately so AuthContext can find it
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data));

//       login(data); // update context state

//       // Go back to wherever the user was trying to reach
//       navigate(from, { replace: true });
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Login</h2>
//         <p className="text-center text-gray-500 text-sm mb-6">
//           Welcome back to Fouz Ki Mehndi 🌿
//         </p>

//         {error && (
//           <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-5 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "Logging in…" : "Login"}
//         </button>

//         <div className="text-center mt-4">
//           <p className="text-gray-500 text-sm">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-green-700 hover:text-green-800 font-semibold underline">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // After login, go back to where the user came from (e.g. /booking/123)
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      // Save token + user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      login(data);

      // Return to booking page (or home)
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🌿</div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Login to confirm your booking</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Logging in…
            </span>
          ) : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;