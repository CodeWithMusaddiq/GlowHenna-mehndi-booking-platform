// // import React, { useState, useEffect } from 'react';
// // import api from '../services/api';
// // import DesignCard from '../components/DesignCard';

// // const DesignPage = () => {
// //   const [designs, setDesigns] = useState([]);
// //   const [filteredDesigns, setFilteredDesigns] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Filter states
// //   const [categoryFilter, setCategoryFilter] = useState('');
// //   const [handSizeFilter, setHandSizeFilter] = useState('');

// //   // Available options
// //   const categories = ['Basic', 'Bridal', 'Arabic', 'Festival', 'Floral'];
// //   const handSizes = ['small', 'medium', 'large'];

// //   // Fetch designs on mount
// //   useEffect(() => {
// //     fetchDesigns();
// //   }, []);

// //   // Apply filters
// //   useEffect(() => {
// //     applyFilters();
// //   }, [designs, categoryFilter, handSizeFilter]);

// //   const fetchDesigns = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await api.get('/api/designs');
// //       setDesigns(response.data.data);
// //       setFilteredDesigns(response.data.data);
// //       setError(null);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to fetch designs');
// //       console.error('Error fetching designs:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const applyFilters = () => {
// //     let filtered = [...designs];

// //     // Filter by category
// //     if (categoryFilter) {
// //       filtered = filtered.filter(
// //         (design) => design.category === categoryFilter
// //       );
// //     }

// //     // Filter by hand size
// //     if (handSizeFilter) {
// //       filtered = filtered.filter(
// //         (design) => design.suitableHandSize === handSizeFilter
// //       );
// //     }

// //     setFilteredDesigns(filtered);
// //   };

// //   const resetFilters = () => {
// //     setCategoryFilter('');
// //     setHandSizeFilter('');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading designs...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-red-600 text-lg mb-4">{error}</p>
// //           <button
// //             onClick={fetchDesigns}
// //             className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-2">
// //             Mehndi Design Gallery
// //           </h1>
// //           <p className="text-gray-600">
// //             Explore our beautiful collection of mehndi designs
// //           </p>
// //         </div>

// //         {/* Filters */}
// //         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// //           <h2 className="text-lg font-semibold text-gray-800 mb-4">
// //             Filter Designs
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             {/* Category Filter */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Category
// //               </label>
// //               <select
// //                 value={categoryFilter}
// //                 onChange={(e) => setCategoryFilter(e.target.value)}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
// //               >
// //                 <option value="">All Categories</option>
// //                 {categories.map((category) => (
// //                   <option key={category} value={category}>
// //                     {category}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Hand Size Filter */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Hand Size
// //               </label>
// //               <select
// //                 value={handSizeFilter}
// //                 onChange={(e) => setHandSizeFilter(e.target.value)}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
// //               >
// //                 <option value="">All Sizes</option>
// //                 {handSizes.map((size) => (
// //                   <option key={size} value={size}>
// //                     {size.charAt(0).toUpperCase() + size.slice(1)}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Reset Button */}
// //             <div className="flex items-end">
// //               <button
// //                 onClick={resetFilters}
// //                 className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
// //               >
// //                 Reset Filters
// //               </button>
// //             </div>
// //           </div>

// //           {/* Results Count */}
// //           <div className="mt-4 text-sm text-gray-600">
// //             Showing {filteredDesigns.length} of {designs.length} designs
// //           </div>
// //         </div>

// //         {/* Designs Grid */}
// //         {filteredDesigns.length === 0 ? (
// //           <div className="text-center py-12">
// //             <p className="text-gray-600 text-lg">
// //               No designs found matching your filters.
// //             </p>
// //             <button
// //               onClick={resetFilters}
// //               className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
// //             >
// //               Clear Filters
// //             </button>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredDesigns.map((design) => (
// //               <DesignCard key={design._id} design={design} />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DesignPage;

// import React, { useEffect, useState } from "react";

// const categories = ["Basic", "Bridal", "Arabic", "Festival", "Floral"];
// const handSizes = ["Small", "Medium", "Large"];

// const generateDesigns = () => {
//   const designs = [];

//   for (let i = 1; i <= 500; i++) {
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     const handSize = handSizes[Math.floor(Math.random() * handSizes.length)];

//     designs.push({
//       id: i,
//       name: `${category} Mehndi Design ${i}`,
//       category,
//       handSize,
//       price: Math.floor(Math.random() * 4000) + 1000,
//       image: `https://source.unsplash.com/600x600/?${category.toLowerCase()}+mehndi+design&sig=${i}`
//     });
//   }

//   return designs;
// };

// const DesignPage = () => {
//   const [designs, setDesigns] = useState([]);
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [handSizeFilter, setHandSizeFilter] = useState("");

//   useEffect(() => {
//     setDesigns(generateDesigns());
//   }, []);

//   const filteredDesigns = designs.filter((design) => {
//     return (
//       (categoryFilter === "" || design.category === categoryFilter) &&
//       (handSizeFilter === "" || design.handSize === handSizeFilter)
//     );
//   });

//   const resetFilters = () => {
//     setCategoryFilter("");
//     setHandSizeFilter("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold mb-2">
//           Mehndi Design Gallery
//         </h1>
//         <p className="text-gray-600">
//           Explore 500 beautiful mehndi designs
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white shadow-md rounded-xl p-6 mb-10">
//         <div className="grid md:grid-cols-3 gap-4">
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="p-3 border rounded-lg"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat}>{cat}</option>
//             ))}
//           </select>

//           <select
//             value={handSizeFilter}
//             onChange={(e) => setHandSizeFilter(e.target.value)}
//             className="p-3 border rounded-lg"
//           >
//             <option value="">All Sizes</option>
//             {handSizes.map((size) => (
//               <option key={size}>{size}</option>
//             ))}
//           </select>

//           <button
//             onClick={resetFilters}
//             className="bg-gray-200 rounded-lg"
//           >
//             Reset Filters
//           </button>
//         </div>

//         <p className="mt-4 text-gray-600">
//           Showing {filteredDesigns.length} of 500 designs
//         </p>
//       </div>

//       {/* Design Grid */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredDesigns.map((design) => (
//           <div
//             key={design.id}
//             className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
//           >
//             <div className="aspect-square overflow-hidden">
//               <img
//                 src={design.image}
//                 alt={design.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="p-4">
//               <h3 className="font-semibold mb-2">
//                 {design.name}
//               </h3>

//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>{design.category}</span>
//                 <span>{design.handSize}</span>
//               </div>

//               <div className="text-pink-600 font-bold">
//                 ₹{design.price}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DesignPage;

import React, { useEffect, useState } from "react";

const ACCESS_KEY = "z7rgfSYWxzB7ByzdH7Q1k74i51_dJyXaPOZOhCWN2PE";

const categories = [
  { name: "Basic", query: "simple henna mehndi hand design" },
  { name: "Bridal", query: "bridal full hand henna mehndi design" },
  { name: "Arabic", query: "arabic style henna mehndi design" },
  { name: "Festival", query: "festival henna mehndi design hand" },
  { name: "Floral", query: "floral henna mehndi hand design" }
];

const handSizes = ["Small", "Medium", "Large"];

const DesignPage = () => {
  const [designs, setDesigns] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [handSizeFilter, setHandSizeFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateAllDesigns();
  }, []);

  const generateAllDesigns = async () => {
    try {
      setLoading(true);

      let allDesigns = [];

      for (let category of categories) {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            category.query
          )}&per_page=30&page=${Math.floor(Math.random() * 5) + 1}`,
          {
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        const data = await response.json();

        const generated = data.results.map((img, index) => ({
          id: `${category.name}-${index}-${Math.random()}`,
          name: `${category.name} Mehndi Design ${index + 1}`,
          category: category.name,
          handSize:
            handSizes[Math.floor(Math.random() * handSizes.length)],
          price: Math.floor(Math.random() * 4000) + 1000,
          image: img.urls.regular,
        }));

        allDesigns = [...allDesigns, ...generated];
      }

      setDesigns(allDesigns);
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDesigns = designs.filter((design) => {
    return (
      (categoryFilter === "" || design.category === categoryFilter) &&
      (handSizeFilter === "" || design.handSize === handSizeFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Mehndi Design Gallery
        </h1>
        <p className="text-gray-600">
          Explore beautiful henna designs by category
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.name}>{cat.name}</option>
            ))}
          </select>

          <select
            value={handSizeFilter}
            onChange={(e) => setHandSizeFilter(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="">All Sizes</option>
            {handSizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>

          <button
            onClick={generateAllDesigns}
            className="bg-gray-200 rounded-lg"
          >
            Refresh Designs
          </button>
        </div>

        <p className="mt-4 text-gray-600">
          Showing {filteredDesigns.length} designs
        </p>
      </div>

      {loading && (
        <p className="text-center text-lg">Loading Mehndi Designs...</p>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <div className="aspect-square">
              <img
                src={design.image}
                alt={design.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-2">
                {design.name}
              </h3>

              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{design.category}</span>
                <span>{design.handSize}</span>
              </div>

              <div className="text-pink-600 font-bold">
                ₹{design.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPage;