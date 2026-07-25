import React from 'react';

const DesignCard = ({ design }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Design Image */}
      <div className="h-64 bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
        <img
          src={design.imageURL}
          alt={design.designName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/FFC0CB/FFFFFF?text=Mehndi+Design';
          }}
        />
      </div>

      {/* Design Details */}
      <div className="p-5">
        {/* Design Name */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {design.designName}
        </h3>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
            {design.category}
          </span>
        </div>

        {/* Hand Size */}
        <div className="flex items-center mb-3">
          <svg
            className="w-5 h-5 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <span className="text-gray-600 text-sm">
            Best for: <span className="font-medium capitalize">{design.suitableHandSize}</span> hands
          </span>
        </div>

        {/* Base Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-gray-600 text-sm">Starting from:</span>
          <span className="text-2xl font-bold text-pink-600">
            ₹{design.basePrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;