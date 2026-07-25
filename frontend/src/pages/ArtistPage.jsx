

import React, { useState, useEffect } from "react";
import api from "../services/api";
import ArtistCard from "../components/ArtistCard";

const hyderabadLocations = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Hitech City",
  "Kukatpally",
  "Secunderabad",
  "Madhapur",
  "Kondapur",
  "LB Nagar",
  "Uppal",
  "Begumpet",
  "Mehdipatnam",
  "Dilsukhnagar",
  "Ameerpet",
  "Tolichowki"
  
];

const designTypes = ["Basic", "Bridal", "Arabic", "Festival", "Floral"];

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [locationFilter, setLocationFilter] = useState("");
  const [designTypeFilter, setDesignTypeFilter] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [artists, locationFilter, designTypeFilter]);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/artists");

      // Only Hyderabad artists
      const hyderabadArtists = response.data.data.filter((artist) =>
        hyderabadLocations.includes(artist.location)
      );

      setArtists(hyderabadArtists);
      setFilteredArtists(hyderabadArtists);
      setError(null);
    } catch (err) {
      setError("Failed to fetch artists");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...artists];

    if (locationFilter) {
      filtered = filtered.filter((artist) =>
        artist.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (designTypeFilter) {
      filtered = filtered.filter((artist) =>
        artist.designTypes.includes(designTypeFilter)
      );
    }

    setFilteredArtists(filtered);
  };

  const handleLocationChange = (value) => {
    setLocationFilter(value);

    if (value.length > 0) {
      const filteredSuggestions = hyderabadLocations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const resetFilters = () => {
    setLocationFilter("");
    setDesignTypeFilter("");
    setSuggestions([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-16 w-16 border-b-4 border-pink-600 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Hyderabad Mehndi Artists</h1>
          <p className="text-gray-600">
            Explore top mehndi artists across Hyderabad, Telangana
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Location */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search Hyderabad area..."
                value={locationFilter}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              />

              {suggestions.length > 0 && (
                <div className="absolute bg-white border w-full mt-1 rounded-lg shadow-lg z-10">
                  {suggestions.map((loc, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setLocationFilter(loc);
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Design Type */}
            <select
              value={designTypeFilter}
              onChange={(e) => setDesignTypeFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Types</option>
              {designTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
            >
              Reset Filters
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredArtists.length} artists
          </div>
        </div>

        {filteredArtists.length === 0 ? (
          <div className="text-center text-gray-600">
            No artists found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;