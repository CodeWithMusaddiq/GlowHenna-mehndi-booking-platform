
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ArtistPage from "./pages/ArtistPage";
// import DesignPage from "./pages/DesignPage";
// import PriceEstimator from "./pages/PriceEstimator";    
// import BookingPage from "./pages/BookingPage";
// import PaymentPage from "./pages/PaymentPage";
// import FestivalPage from "./pages/FestivalPage";
// import DesignSuggestionPage from "./pages/DesignSuggestionPage"; // 👈 NEW IMPORT
// import ProtectedRoute from "./components/ProtectedRoute";
// import HomePage from "./pages/HomePage";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <Routes>
//       <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/artists" element={<ArtistPage />} />
//         <Route path="/designs" element={<DesignPage />} />
//         <Route path="/price-estimator" element={<PriceEstimator />} />
//         <Route path="/festival" element={<FestivalPage />} />
//         <Route path="/design-suggestion" element={<DesignSuggestionPage />} /> {/* 👈 NEW ROUTE */}

//         {/* Protected routes */}
//         <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
//         <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
// <Route
//   path="/booking/:artistId"
//   element={
//     <ProtectedRoute>
//       <BookingPage />
//     </ProtectedRoute>
//   }
// />
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArtistPage from "./pages/ArtistPage";
import DesignPage from "./pages/DesignPage";
import PriceEstimator from "./pages/PriceEstimator";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import FestivalPage from "./pages/FestivalPage";
import DesignSuggestionPage from "./pages/DesignSuggestionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/designs" element={<DesignPage />} />
        <Route path="/price-estimator" element={<PriceEstimator />} />
        <Route path="/festival" element={<FestivalPage />} />
        <Route path="/design-suggestion" element={<DesignSuggestionPage />} />

        {/* Booking is PUBLIC — artist details show without login.
            Login is only required when submitting the form. */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/:artistId" element={<BookingPage />} />

        {/* Payment still requires login */}
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;