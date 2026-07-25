import React from 'react';

const SuggestionCard = ({ design, confidence, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 transform hover:-translate-y-2 animate-fadeInUp">
      {/* Confidence Badge & Image */}
      <div className="relative group">
        {/* Animated Confidence Badge */}
        <div className="absolute top-3 left-3 z-20">
          <div className="relative">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-xl animate-pulse">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-sm">{confidence}% Match</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-green-400 blur-xl opacity-50 animate-pulse"></div>
          </div>
        </div>

        {/* Best Match Badge */}
        {confidence >= 85 && (
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce">
              ⭐ Best Match
            </div>
          </div>
        )}
        
        {/* Design Image with Overlay */}
        <div className="h-72 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden relative">
          <img
            src={design.imageURL}
            alt={design.designName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300/FFC0CB/FFFFFF?text=Mehndi+Design';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Design Details */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
          {design.designName}
        </h3>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm rounded-full font-semibold">
            <span className="mr-2">✨</span>
            {design.category}
          </span>
        </div>

        {/* Hand Size Match */}
        <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <svg
            className="w-6 h-6 text-green-600 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-green-800 font-semibold text-sm">Perfect Match!</p>
            <p className="text-green-600 text-xs">
              Ideal for <span className="font-bold capitalize">{design.suitableHandSize}</span> hands
            </p>
          </div>
        </div>

        {/* Why This Suits You */}
        <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-10">💎</div>
          <p className="text-blue-900 font-bold text-sm mb-2 flex items-center">
            <span className="mr-2">✨</span>
            Why This Design Suits You
          </p>
          <p className="text-blue-700 text-xs leading-relaxed">
            Specially curated for <strong>{design.suitableHandSize}</strong> hands. 
            This <strong>{design.category.toLowerCase()}</strong> design complements 
            your hand proportions perfectly and will look stunning!
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-5 pt-4 border-t-2 border-gray-100">
          <div>
            <p className="text-gray-500 text-xs mb-1">Starting from</p>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              ₹{design.basePrice}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">AI Confidence</p>
            <p className="text-lg font-bold text-green-600">{confidence}%</p>
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={() => onSelect(design)}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
        >
          <span className="relative z-10 flex items-center justify-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Select This Design
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-700 via-purple-700 to-pink-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;