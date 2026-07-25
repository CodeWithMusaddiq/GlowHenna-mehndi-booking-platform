// import React, { useState } from 'react';

// const PriceEstimator = () => {
//   const [formData, setFormData] = useState({
//     basePrice: '',
//     numberOfHands: 1,
//     occasion: 'normal',
//     bookingDate: '',
//   });

//   const [estimatedPrice, setEstimatedPrice] = useState(null);

//   // Price calculation logic (same as backend)
//   const calculatePrice = () => {
//     const { basePrice, numberOfHands, occasion, bookingDate } = formData;

//     if (!basePrice || !numberOfHands) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     let total = parseFloat(basePrice) * parseInt(numberOfHands);

//     // Apply occasion multiplier
//     if (occasion === 'wedding') {
//       total *= 1.2; // +20% for weddings
//     }

//     // Check if date is festival (simplified logic)
//     if (bookingDate && isFestivalDate(new Date(bookingDate))) {
//       total *= 1.15; // +15% for festival dates
//     }

//     setEstimatedPrice(Math.round(total * 100) / 100);
//   };

//   // Simple festival checker (same logic as backend)
//   const isFestivalDate = (date) => {
//     const month = date.getMonth() + 1;
//     const day = date.getDate();

//     // Festival dates (simplified)
//     const festivals = [
//       { month: 4, day: 10 }, { month: 4, day: 11 }, { month: 4, day: 12 },
//       { month: 5, day: 1 }, { month: 5, day: 2 }, { month: 5, day: 3 },
//       { month: 6, day: 16 }, { month: 6, day: 17 }, { month: 6, day: 18 },
//       { month: 7, day: 1 }, { month: 7, day: 2 }, { month: 7, day: 3 },
//       { month: 10, day: 20 }, { month: 10, day: 24 }, { month: 10, day: 25 }, { month: 10, day: 26 },
//       { month: 11, day: 1 }, { month: 11, day: 2 }, { month: 11, day: 3 },
//       { month: 3, day: 25 }, { month: 3, day: 26 },
//     ];

//     const isFestival = festivals.some(
//       (festival) => festival.month === month && festival.day === day
//     );

//     // Wedding season (Nov - Feb)
//     const isWeddingSeason = month >= 11 || month <= 2;

//     return isFestival || isWeddingSeason;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetEstimator = () => {
//     setFormData({
//       basePrice: '',
//       numberOfHands: 1,
//       occasion: 'normal',
//       bookingDate: '',
//     });
//     setEstimatedPrice(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Price Estimator
//           </h1>
//           <p className="text-gray-600">
//             Get an estimated price for your mehndi booking
//           </p>
//           <p className="text-sm text-pink-600 mt-2">
//             Note: Final price will be confirmed during booking
//           </p>
//         </div>

//         {/* Estimator Form */}
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <div className="space-y-6">
//             {/* Base Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Design Base Price (₹) *
//               </label>
//               <input
//                 type="number"
//                 name="basePrice"
//                 value={formData.basePrice}
//                 onChange={handleInputChange}
//                 placeholder="Enter design base price"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 min="0"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Check the design page for base prices
//               </p>
//             </div>

//             {/* Number of Hands */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Number of People/Hands *
//               </label>
//               <input
//                 type="number"
//                 name="numberOfHands"
//                 value={formData.numberOfHands}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 min="1"
//                 required
//               />
//             </div>

//             {/* Occasion */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Occasion
//               </label>
//               <select
//                 name="occasion"
//                 value={formData.occasion}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               >
//                 <option value="normal">Normal (+0%)</option>
//                 <option value="wedding">Wedding (+20%)</option>
//               </select>
//             </div>

//             {/* Booking Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Booking Date (Optional)
//               </label>
//               <input
//                 type="date"
//                 name="bookingDate"
//                 value={formData.bookingDate}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Festival dates and wedding season get +15% surcharge
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4">
//               <button
//                 onClick={calculatePrice}
//                 className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
//               >
//                 Calculate Price
//               </button>
//               <button
//                 onClick={resetEstimator}
//                 className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>

//           {/* Estimated Price Display */}
//           {estimatedPrice !== null && (
//             <div className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border-2 border-pink-300">
//               <div className="text-center">
//                 <p className="text-sm text-gray-600 mb-2">Estimated Price</p>
//                 <p className="text-5xl font-bold text-pink-600 mb-2">
//                   ₹{estimatedPrice}
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   * This is an estimate. Final price will be calculated during booking.
//                 </p>
//               </div>

//               {/* Price Breakdown */}
//               <div className="mt-6 pt-6 border-t border-pink-300">
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                   Price Breakdown:
//                 </h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Base Price:</span>
//                     <span className="font-medium">₹{formData.basePrice}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Number of People:</span>
//                     <span className="font-medium">×{formData.numberOfHands}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Subtotal:</span>
//                     <span className="font-medium">
//                       ₹{formData.basePrice * formData.numberOfHands}
//                     </span>
//                   </div>
//                   {formData.occasion === 'wedding' && (
//                     <div className="flex justify-between text-pink-600">
//                       <span>Wedding Surcharge:</span>
//                       <span className="font-medium">+20%</span>
//                     </div>
//                   )}
//                   {formData.bookingDate &&
//                     isFestivalDate(new Date(formData.bookingDate)) && (
//                       <div className="flex justify-between text-purple-600">
//                         <span>Festival Surcharge:</span>
//                         <span className="font-medium">+15%</span>
//                       </div>
//                     )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PriceEstimator;
import React, { useState } from "react";

const PriceEstimator = () => {
  const [formData, setFormData] = useState({
    basePrice: "",
    numberOfHands: 1,
    occasion: "normal",
    bookingDate: "",
  });

  const [estimatedPrice, setEstimatedPrice] = useState(null);

  // ----------------------------
  // Festival Date Checker
  // ----------------------------
  const isFestivalDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const festivals = [
      { month: 4, day: 10 }, { month: 4, day: 11 }, { month: 4, day: 12 },
      { month: 10, day: 24 }, { month: 10, day: 25 }, { month: 10, day: 26 },
      { month: 3, day: 25 }, { month: 3, day: 26 },
    ];

    return festivals.some(
      (festival) => festival.month === month && festival.day === day
    );
  };

  // ----------------------------
  // Wedding Season Checker
  // ----------------------------
  const isWeddingSeason = (date) => {
    const month = date.getMonth() + 1;
    return month >= 11 || month <= 2; // Nov - Feb
  };

  // ----------------------------
  // Calculate Price
  // ----------------------------
  const calculatePrice = () => {
    const { basePrice, numberOfHands, occasion, bookingDate } = formData;

    if (!basePrice || !numberOfHands) {
      alert("Please fill in all required fields");
      return;
    }

    const price = parseFloat(basePrice);
    const qty = parseInt(numberOfHands);

    const subtotal = price * qty;

    let total = subtotal;

    let weddingCharge = 0;
    let festivalCharge = 0;
    let seasonCharge = 0;

    // Wedding Occasion (+20%)
    if (occasion === "wedding") {
      weddingCharge = subtotal * 0.2;
      total += weddingCharge;
    }

    if (bookingDate) {
      const date = new Date(bookingDate);

      // Festival Date (+15%)
      if (isFestivalDate(date)) {
        festivalCharge = subtotal * 0.15;
        total += festivalCharge;
      }

      // Wedding Season (+10%)
      if (isWeddingSeason(date)) {
        seasonCharge = subtotal * 0.1;
        total += seasonCharge;
      }
    }

    setEstimatedPrice({
      subtotal,
      weddingCharge,
      festivalCharge,
      seasonCharge,
      total,
    });
  };

  const resetEstimator = () => {
    setFormData({
      basePrice: "",
      numberOfHands: 1,
      occasion: "normal",
      bookingDate: "",
    });
    setEstimatedPrice(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-200 py-12 px-4 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            🌸 Price Estimator
          </h1>
          <p className="text-gray-600">
            Get an estimated price for your mehndi booking
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-8 transition-all duration-500">

          <div className="space-y-6">

            {/* Base Price */}
            <div>
              <label className="block font-medium mb-2">
                Design Base Price (₹)
              </label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Enter base price"
              />
            </div>

            {/* Number of Hands */}
            <div>
              <label className="block font-medium mb-2">
                Number of People/Hands
              </label>
              <input
                type="number"
                name="numberOfHands"
                value={formData.numberOfHands}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            {/* Occasion */}
            <div>
              <label className="block font-medium mb-2">Occasion</label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
              >
                <option value="normal">Normal</option>
                <option value="wedding">Wedding (+20%)</option>
              </select>
            </div>

            {/* Booking Date */}
            <div>
              <label className="block font-medium mb-2">
                Booking Date (Optional)
              </label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Festival dates (+15%) | Wedding season Nov–Feb (+10%)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={calculatePrice}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                Calculate Price
              </button>

              <button
                onClick={resetEstimator}
                className="px-6 bg-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Result */}
          {estimatedPrice && (
            <div className="mt-10 p-8 bg-white rounded-2xl shadow-xl animate-fadeIn">

              <div className="text-center mb-6">
                <h2 className="text-lg text-gray-600">Estimated Price</h2>
                <p className="text-5xl font-bold text-pink-600 mt-2">
                  ₹{estimatedPrice.total.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{estimatedPrice.subtotal.toLocaleString("en-IN")}</span>
                </div>

                {estimatedPrice.weddingCharge > 0 && (
                  <div className="flex justify-between text-pink-600">
                    <span>Wedding Charge (20%):</span>
                    <span>₹{estimatedPrice.weddingCharge.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {estimatedPrice.festivalCharge > 0 && (
                  <div className="flex justify-between text-purple-600">
                    <span>Festival Charge (15%):</span>
                    <span>₹{estimatedPrice.festivalCharge.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {estimatedPrice.seasonCharge > 0 && (
                  <div className="flex justify-between text-orange-500">
                    <span>Wedding Season (10%):</span>
                    <span>₹{estimatedPrice.seasonCharge.toLocaleString("en-IN")}</span>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceEstimator;