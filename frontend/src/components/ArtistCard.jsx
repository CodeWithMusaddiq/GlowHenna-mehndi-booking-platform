
import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${artist._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100">
      {/* Image */}
      <div className="h-52 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        {artist.sampleImages && artist.sampleImages.length > 0 ? (
          <img
            src={artist.sampleImages[0]}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl text-pink-300">🎨</div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {artist.name}
        </h3>

        <p className="text-sm text-gray-600 mb-1">
          📍 {artist.location}
        </p>

        <p className="text-sm text-gray-600 mb-3">
          📞 {artist.phone}
        </p>

        {/* Design Types */}
        <div className="flex flex-wrap gap-2 mb-4">
          {artist.designTypes.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-sm text-gray-500">Price Range</span>
          <div className="text-lg font-bold text-pink-600">
            ₹{artist.priceRange.min} - ₹{artist.priceRange.max}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < Math.floor(artist.rating) ? "⭐" : "☆"}
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {artist.rating.toFixed(1)}
          </span>
        </div>

        {/* Availability + Button */}
        <div className="flex items-center justify-between mt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              artist.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {artist.availability ? "✓ Available" : "✗ Unavailable"}
          </span>

          {artist.availability && (
            <button
              onClick={handleBookNow}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
