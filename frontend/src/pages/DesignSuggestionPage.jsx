
import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";

const ACCESS_KEY = "z7rgfSYWxzB7ByzdH7Q1k74i51_dJyXaPOZOhCWN2PE";

const DesignSuggestionPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [suggestedImages, setSuggestedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (imageData) => {
    if (!imageData) {
      setAnalysis(null);
      setSuggestedImages([]);
      return;
    }

    setAnalysis(imageData.analysis);
    fetchUnsplashImages(imageData.analysis.handSize);
  };

  const fetchUnsplashImages = async (handSize) => {
    try {
      setLoading(true);

      let query = "henna hand mehndi";

      if (handSize === "small") {
        query = "minimal henna design hand";
      } else if (handSize === "medium") {
        query = "mehndi design hand";
      } else if (handSize === "large") {
        query = "bridal henna full hand";
      }

      // 🔥 RANDOM PAGE (1–10)
      const randomPage = Math.floor(Math.random() * 10) + 1;

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=10&page=${randomPage}`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();

      const images = data.results.map((img) => img.urls.regular);

      setSuggestedImages(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">AI Mehndi Suggestion</h1>

      <ImageUploader onImageUpload={handleImageUpload} />

      {analysis && (
        <p className="mt-4 font-semibold">
          Detected Hand Size: {analysis.handSize}
        </p>
      )}

      {loading && <p className="mt-6">Loading suggestions...</p>}

      {suggestedImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {suggestedImages.map((img, index) => (
            <div
              key={index}
              className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg flex items-center justify-center"
            >
              <img
                src={img}
                alt="Mehndi suggestion"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignSuggestionPage;