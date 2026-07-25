// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// const BookingPage = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [artists, setArtists] = useState([]);
//   const [designs, setDesigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const [formData, setFormData] = useState({
//     artistId: '',
//     designId: '',
//     bookingDate: '',
//     time: '',
//     address: '',
//     numberOfPeople: 1,
//     occasion: 'normal',
//   });

//   const [createdBooking, setCreatedBooking] = useState(null);

//   // Fetch artists and designs on mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [artistsRes, designsRes] = await Promise.all([
//         api.get('/api/artists'),
//         api.get('/api/designs'),
//       ]);

//       setArtists(artistsRes.data.data);
//       setDesigns(designsRes.data.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load booking data. Please try again.');
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.artistId || !formData.designId || !formData.bookingDate || 
//         !formData.time || !formData.address) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     try {
//       setSubmitting(true);
//       setError(null);

//       const response = await api.post('/api/bookings', formData);

//       setCreatedBooking(response.data.data);
//       setSuccess(true);

//       // Scroll to success message
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } catch (err) {
//       setError(
//         err.response?.data?.message || 
//         'Failed to create booking. Please try again.'
//       );
//       console.error('Booking error:', err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handlePaymentRedirect = () => {
//     navigate('/payment', { state: { booking: createdBooking } });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading booking form...</p>
//         </div>
//       </div>
//     );
//   }

//   if (success && createdBooking) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto">
//           {/* Success Card */}
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <div className="text-center mb-6">
//               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
//                 <svg
//                   className="h-10 w-10 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Booking Created Successfully!
//               </h2>
//               <p className="text-gray-600">
//                 Your booking has been confirmed. Please proceed to payment.
//               </p>
//             </div>

//             {/* Booking Summary */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Booking Summary
//               </h3>

//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Booking ID:</span>
//                   <span className="font-medium text-sm">
//                     {createdBooking._id}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Artist:</span>
//                   <span className="font-medium">
//                     {createdBooking.artistId?.name}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Design:</span>
//                   <span className="font-medium">
//                     {createdBooking.designId?.designName}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Date & Time:</span>
//                   <span className="font-medium">
//                     {new Date(createdBooking.bookingDate).toLocaleDateString()} at {createdBooking.time}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Number of People:</span>
//                   <span className="font-medium">
//                     {createdBooking.numberOfPeople}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Status:</span>
//                   <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
//                     {createdBooking.bookingStatus}
//                   </span>
//                 </div>

//                 <div className="pt-3 border-t border-gray-300 flex justify-between items-center">
//                   <span className="text-lg font-semibold text-gray-800">
//                     Total Price:
//                   </span>
//                   <span className="text-2xl font-bold text-pink-600">
//                     ₹{createdBooking.totalPrice}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               <button
//                 onClick={handlePaymentRedirect}
//                 className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
//               >
//                 Proceed to Payment
//               </button>
//               <button
//                 onClick={() => navigate('/bookings/user')}
//                 className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//               >
//                 View My Bookings
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Create Booking
//           </h1>
//           <p className="text-gray-600">
//             Book your mehndi appointment with your favorite artist
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         {/* Booking Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
//           <div className="space-y-6">
//             {/* Select Artist */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Artist *
//               </label>
//               <select
//                 name="artistId"
//                 value={formData.artistId}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 required
//               >
//                 <option value="">Choose an artist...</option>
//                 {artists
//                   .filter((artist) => artist.availability)
//                   .map((artist) => (
//                     <option key={artist._id} value={artist._id}>
//                       {artist.name} - {artist.location} (₹{artist.priceRange.min} - ₹{artist.priceRange.max})
//                     </option>
//                   ))}
//               </select>
//             </div>

//             {/* Select Design */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Design *
//               </label>
//               <select
//                 name="designId"
//                 value={formData.designId}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 required
//               >
//                 <option value="">Choose a design...</option>
//                 {designs.map((design) => (
//                   <option key={design._id} value={design._id}>
//                     {design.designName} - {design.category} (₹{design.basePrice})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Booking Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Booking Date *
//               </label>
//               <input
//                 type="date"
//                 name="bookingDate"
//                 value={formData.bookingDate}
//                 onChange={handleInputChange}
//                 min={new Date().toISOString().split('T')[0]}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             {/* Time */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Time *
//               </label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address *
//               </label>
//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 rows="3"
//                 placeholder="Enter your complete address..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             {/* Number of People */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Number of People *
//               </label>
//               <input
//                 type="number"
//                 name="numberOfPeople"
//                 value={formData.numberOfPeople}
//                 onChange={handleInputChange}
//                 min="1"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
//                 <option value="normal">Normal</option>
//                 <option value="wedding">Wedding</option>
//                 <option value="festival">Festival</option>
//               </select>
//               <p className="text-xs text-gray-500 mt-1">
//                 Special occasions may have additional charges
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {submitting ? 'Creating Booking...' : 'Create Booking'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookingPage = () => {
  const navigate = useNavigate();
  const { artistId } = useParams();
  const { user } = useContext(AuthContext);

  const [artist, setArtist] = useState(null);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  const [formData, setFormData] = useState({
    artistId: artistId || '',
    designId: '',
    bookingDate: '',
    time: '',
    address: '',
    numberOfPeople: 1,
    occasion: 'normal',
  });

  useEffect(() => {
    fetchData();
  }, [artistId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const designsRes = await api.get('/api/designs');
      const allDesigns = designsRes.data.data;

      if (artistId) {
        const artistRes = await api.get(`/api/artists/${artistId}`);
        const artistData = artistRes.data.data;
        setArtist(artistData);
        setFormData((prev) => ({ ...prev, artistId: artistData._id }));

        const matched = allDesigns.filter((d) =>
          artistData.designTypes.includes(d.category)
        );
        setFilteredDesigns(matched.length > 0 ? matched : allDesigns);
      } else {
        setFilteredDesigns(allDesigns);
      }
    } catch (err) {
      setError('Failed to load data. Please refresh and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesignSelect = (design) => {
    setSelectedDesign(design);
    setFormData((prev) => ({ ...prev, designId: design._id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If not logged in, redirect to login and come back
    if (!user) {
      navigate('/login', {
        state: { from: { pathname: `/booking/${artistId || ''}` } },
      });
      return;
    }

    if (!formData.artistId || !formData.designId || !formData.bookingDate ||
      !formData.time || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await api.post('/api/bookings', formData);
      setCreatedBooking(response.data.data);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-pink-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🌸</div>
          </div>
          <p className="text-gray-500 font-medium">Loading artist details…</p>
        </div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (success && createdBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-1">Booking Confirmed!</h2>
              <p className="text-green-100">Your appointment has been successfully created.</p>
            </div>
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-5">Booking Summary</h3>
              <div className="space-y-4">
                {[
                  { label: 'Booking ID', value: createdBooking._id, small: true },
                  { label: 'Artist', value: createdBooking.artistId?.name },
                  { label: 'Design', value: createdBooking.designId?.designName },
                  {
                    label: 'Date & Time',
                    value: `${new Date(createdBooking.bookingDate).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })} at ${createdBooking.time}`,
                  },
                  { label: 'People', value: createdBooking.numberOfPeople },
                ].map(({ label, value, small }) => (
                  <div key={label} className="flex justify-between items-start border-b border-gray-100 pb-3">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className={`font-medium text-right ${small ? 'text-xs text-gray-400 max-w-[180px] break-all' : 'text-gray-800'}`}>
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-700 font-semibold text-lg">Total</span>
                  <span className="text-2xl font-bold text-pink-600">₹{createdBooking.totalPrice}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => navigate('/payment', { state: { booking: createdBooking } })}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition-colors shadow-md shadow-pink-200"
                >
                  Proceed to Payment →
                </button>
                <button
                  onClick={() => navigate('/bookings/user')}
                  className="px-5 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-medium transition-colors"
                >
                  My Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Page ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Book Your Appointment</h1>
          <p className="text-gray-500">Fill in the details below to reserve your mehndi session</p>
          {!user && (
            <p className="mt-3 text-sm text-amber-600 bg-amber-50 border border-amber-200 inline-block px-4 py-2 rounded-full">
              ⚠️ You'll be asked to login when submitting the booking
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Artist Profile + Designs ─────────────────────────── */}
          {artist && (
            <div className="lg:col-span-2 space-y-5">

              {/* Artist Card */}
              <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-pink-100">
                {/* Image gallery */}
                <div className="relative h-56 bg-gradient-to-br from-pink-100 to-purple-100">
                  {artist.sampleImages && artist.sampleImages.length > 0 ? (
                    <>
                      <img
                        src={artist.sampleImages[activeImage]}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                      {artist.sampleImages.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                          {artist.sampleImages.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveImage(i)}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeImage ? 'bg-white scale-125' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl">🎨</div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${artist.availability ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                      {artist.availability ? '✓ Available' : '✗ Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Thumbnail strip */}
                {artist.sampleImages && artist.sampleImages.length > 1 && (
                  <div className="flex gap-2 px-4 py-3 bg-gray-50 overflow-x-auto">
                    {artist.sampleImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-pink-500' : 'border-transparent'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Artist info */}
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{artist.name}</h2>
                  <p className="text-sm text-gray-500 mb-1">📍 {artist.location}</p>
                  <p className="text-sm text-gray-500 mb-4">📞 {artist.phone}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.designTypes.map((type) => (
                      <span key={type} className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-medium rounded-full border border-pink-200">
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(artist.rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{artist.rating.toFixed(1)}</span>
                  </div>

                  <div className="bg-pink-50 rounded-xl p-3 border border-pink-100">
                    <p className="text-xs text-gray-500 mb-1">Price Range</p>
                    <p className="text-xl font-bold text-pink-600">₹{artist.priceRange.min} – ₹{artist.priceRange.max}</p>
                  </div>
                </div>
              </div>

              {/* Design Showcase */}
              {filteredDesigns.length > 0 && (
                <div className="bg-white rounded-3xl shadow-md p-5 border border-pink-100">
                  <h3 className="text-base font-bold text-gray-800 mb-1">Available Designs</h3>
                  <p className="text-xs text-gray-400 mb-4">Click a design to select it</p>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredDesigns.map((design) => (
                      <button
                        key={design._id}
                        onClick={() => handleDesignSelect(design)}
                        className={`relative rounded-2xl overflow-hidden border-2 transition-all text-left group ${selectedDesign?._id === design._id ? 'border-pink-500 shadow-lg shadow-pink-100' : 'border-gray-100 hover:border-pink-300'}`}
                      >
                        <div className="h-28 bg-gradient-to-br from-pink-100 to-purple-100">
                          {design.imageURL ? (
                            <img src={design.imageURL} alt={design.designName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl">🌿</div>
                          )}
                        </div>
                        {selectedDesign?._id === design._id && (
                          <div className="absolute inset-0 bg-pink-500/10 flex items-start justify-end p-2">
                            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="p-2.5">
                          <p className="text-xs font-semibold text-gray-800 truncate">{design.designName}</p>
                          <p className="text-xs text-gray-400">{design.category}</p>
                          <p className="text-xs font-bold text-pink-600 mt-0.5">₹{design.basePrice}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Right: Booking Form ────────────────────────────────────── */}
          <div className={artist ? 'lg:col-span-3' : 'lg:col-span-5'}>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-md border border-pink-100 p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>

              {/* Selected Design display */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Selected Design *</label>
                {selectedDesign ? (
                  <div className="flex items-center gap-4 p-4 bg-pink-50 border border-pink-200 rounded-xl">
                    {selectedDesign.imageURL && (
                      <img src={selectedDesign.imageURL} alt="" className="w-14 h-14 rounded-lg object-cover border border-pink-200" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{selectedDesign.designName}</p>
                      <p className="text-sm text-gray-500">{selectedDesign.category} · ₹{selectedDesign.basePrice}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSelectedDesign(null); setFormData(p => ({ ...p, designId: '' })); }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <select
                    name="designId"
                    value={formData.designId}
                    onChange={(e) => {
                      const d = filteredDesigns.find(x => x._id === e.target.value);
                      if (d) handleDesignSelect(d);
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-gray-50"
                    required
                  >
                    <option value="">Choose a design…</option>
                    {filteredDesigns.map((d) => (
                      <option key={d._id} value={d._id}>{d.designName} — {d.category} (₹{d.basePrice})</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-gray-50"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter your complete address…"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-gray-50 resize-none"
                  required
                />
              </div>

              {/* People + Occasion */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">No. of People *</label>
                  <input
                    type="number"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none bg-gray-50"
                  >
                    <option value="normal">Normal</option>
                    <option value="wedding">Wedding</option>
                    <option value="festival">Festival</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-400 -mt-4">* Wedding / Festival occasions may have additional charges</p>

              {/* Price preview */}
              {artist && selectedDesign && (
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Design base price</span>
                    <span>₹{selectedDesign.basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>People</span>
                    <span>× {formData.numberOfPeople}</span>
                  </div>
                  <div className="flex justify-between font-bold text-pink-700 text-lg border-t border-pink-200 pt-2">
                    <span>Estimated Total</span>
                    <span>₹{(selectedDesign.basePrice * formData.numberOfPeople).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">* Final price calculated at checkout</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating Booking…
                  </span>
                ) : user ? 'Confirm Booking 🌸' : '🔒 Login to Confirm Booking'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;