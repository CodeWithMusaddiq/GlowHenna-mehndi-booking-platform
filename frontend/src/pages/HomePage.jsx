import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO SECTION */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white py-28 px-6 text-center overflow-hidden">
        
        <div className="max-w-5xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
             <span className="text-yellow-300">Glow Henna Artist Finder 🌿</span>
          </h1>

          <p className="text-xl md:text-2xl text-green-100 mb-10 leading-relaxed">
            Discover stunning mehndi designs curated just for you.  
            Experience AI-powered suggestions and book your favorite artist effortlessly.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/design-suggestion")}
              className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              🤖 Try AI Suggestion
            </button>

            <button
              onClick={() => navigate("/designs")}
              className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-700 transition duration-300"
            >
              🎨 Explore Designs
            </button>
          </div>
        </div>

      </section>

      {/* ✨ FEATURES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-6">🤖</div>
            <h3 className="text-2xl font-semibold mb-4">
              AI Powered Suggestions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Upload your hand image and get personalized mehndi designs tailored to your hand size.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-6">💍</div>
            <h3 className="text-2xl font-semibold mb-4">
              Bridal & Traditional Designs
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Choose from modern, traditional, bridal, and festival special mehndi collections.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-6">📅</div>
            <h3 className="text-2xl font-semibold mb-4">
              Easy Online Booking
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Book professional mehndi artists instantly with our simple and secure booking system.
            </p>
          </div>

        </div>
      </section>

      {/* 🚀 CALL TO ACTION */}
      <section className="bg-green-100 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Find Your Perfect Mehndi?
        </h2>

        <p className="text-lg text-gray-700 mb-10">
          Let our AI help you discover the best design for your special occasion.
        </p>

        <button
          onClick={() => navigate("/design-suggestion")}
          className="bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300"
        >
          Start Now 🚀
        </button>
      </section>

      {/* 🎬 SIMPLE ANIMATION STYLES */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out;
          }
        `}
      </style>

    </div>
  );
};

export default HomePage;