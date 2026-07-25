import React, { useState, useEffect } from 'react';
import api from '../services/api';
import DesignCard from '../components/DesignCard';
import ArtistCard from '../components/ArtistCard';

const FestivalPage = () => {
  const [festivalDesigns, setFestivalDesigns] = useState([]);
  const [availableArtists, setAvailableArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFestivalData();
  }, []);

  const fetchFestivalData = async () => {
    try {
      setLoading(true);

      // Fetch festival designs and available artists
      const [designsRes, artistsRes] = await Promise.all([
        api.get('/api/designs/category/Festival'),
        api.get('/api/artists'),
      ]);

      setFestivalDesigns(designsRes.data.data);
      
      // Filter only available artists
      const available = artistsRes.data.data.filter(
        (artist) => artist.availability === true
      );
      setAvailableArtists(available);

      setError(null);
    } catch (err) {
      setError('Failed to load festival data. Please try again.');
      console.error('Error fetching festival data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading festival collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={fetchFestivalData}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-4">🎉✨🎊</div>
          <h1 className="text-5xl font-bold mb-4">Festival Special</h1>
          <p className="text-xl mb-6 opacity-90">
            Celebrate with our exclusive festival mehndi designs
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">🎁 Special Offers</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">⭐ Premium Designs</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-semibold">👩‍🎨 Expert Artists</span>
            </div>
          </div>
        </div>
      </div>

      {/* Festival Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 shadow-lg">
          <div className="flex items-start">
            <div className="text-3xl mr-4">🎪</div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Festival Season Notice
              </h3>
              <p className="text-yellow-800 mb-2">
                During festival season, special charges apply to ensure premium service:
              </p>
              <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
                <li>Festival date surcharge: +15%</li>
                <li>Wedding season (Nov-Feb): +15%</li>
                <li>Book early to secure your preferred artist and time slot</li>
                <li>Limited availability during peak festival days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Festival Designs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ✨ Festival Mehndi Designs
          </h2>
          <p className="text-gray-600">
            Specially curated designs for your festive celebrations
          </p>
        </div>

        {festivalDesigns.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg mb-4">
              No festival designs available at the moment.
            </p>
            <p className="text-sm text-gray-500">
              Check back soon for our exclusive festival collection!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {festivalDesigns.map((design) => (
              <div key={design._id} className="relative">
                <div className="absolute -top-3 -right-3 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    🎊 Festival Special
                  </span>
                </div>
                <DesignCard design={design} />
              </div>
            ))}
          </div>
        )}

        {/* Available Artists Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              👩‍🎨 Available Artists
            </h2>
            <p className="text-gray-600">
              Book your favorite artist for the festival season
            </p>
          </div>

          {availableArtists.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg mb-4">
                All artists are currently booked.
              </p>
              <p className="text-sm text-gray-500">
                Please check back later or contact us for waitlist options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableArtists.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} />
              ))}
            </div>
          )}
        </div>

        {/* Festival Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            💡 Festival Booking Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">📅</div>
              <h4 className="font-semibold text-gray-800 mb-2">Book Early</h4>
              <p className="text-gray-600 text-sm">
                Festival dates fill up quickly. Book at least 2 weeks in advance
                to secure your preferred time slot.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Flexible Timing
              </h4>
              <p className="text-gray-600 text-sm">
                Consider morning or afternoon slots for better availability and
                potentially lower prices.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-semibold text-gray-800 mb-2">Group Booking</h4>
              <p className="text-gray-600 text-sm">
                Booking for multiple people? Contact us for potential group
                discounts and dedicated time slots.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Communicate Clearly
              </h4>
              <p className="text-gray-600 text-sm">
                Share your design preferences and any specific requirements when
                booking to ensure the best experience.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Book Your Festival Mehndi?
            </h3>
            <p className="mb-6 opacity-90">
              Don't wait! Secure your booking now for the upcoming festival season
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => (window.location.href = '/booking')}
                className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Book Now
              </button>
              <button
                onClick={() => (window.location.href = '/artists')}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Artists
              </button>
            </div>
          </div>
        </div>

        {/* Popular Festivals */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🎊 Upcoming Festivals
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-3xl mb-2">🌙</div>
              <h4 className="font-semibold text-gray-800">Eid</h4>
              <p className="text-xs text-gray-600">April - May</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-3xl mb-2">🪔</div>
              <h4 className="font-semibold text-gray-800">Diwali</h4>
              <p className="text-xs text-gray-600">October - November</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-3xl mb-2">💒</div>
              <h4 className="font-semibold text-gray-800">Wedding Season</h4>
              <p className="text-xs text-gray-600">November - February</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-semibold text-gray-800">Karva Chauth</h4>
              <p className="text-xs text-gray-600">October</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalPage;