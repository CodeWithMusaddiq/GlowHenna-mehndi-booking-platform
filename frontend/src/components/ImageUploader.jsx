import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    setUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Simulate processing delay for better UX
        setTimeout(() => {
          setPreview(e.target.result);
          const analysis = analyzeHandImage(img);
          onImageUpload({
            imageUrl: e.target.result,
            analysis,
          });
          setUploading(false);
        }, 1000);
      };
      img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
  };

  const analyzeHandImage = (img) => {
    const width = img.width;
    const height = img.height;
    const aspectRatio = width / height;

    let handSize;
    let confidence;

    if (width < 800 || height < 800) {
      handSize = 'small';
      confidence = 75;
    } else if (width >= 800 && width < 1500) {
      handSize = 'medium';
      confidence = 85;
    } else {
      handSize = 'large';
      confidence = 80;
    }

    if (aspectRatio < 0.7 || aspectRatio > 1.3) {
      confidence -= 10;
    }

    return {
      handSize,
      confidence,
      dimensions: { width, height },
      aspectRatio: aspectRatio.toFixed(2),
    };
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const clearImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  if (uploading) {
    return (
      <div className="w-full border-2 border-dashed border-pink-300 rounded-lg p-12 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-pink-600 absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
            🔍 Analyzing your image...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This will only take a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 transform hover:scale-105 ${
            dragging
              ? 'border-pink-500 bg-gradient-to-br from-pink-100 to-purple-100 scale-105'
              : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white'
          }`}
        >
          <div className="flex flex-col items-center">
            {/* Animated Icon */}
            <div className="relative mb-6">
              <svg
                className={`w-20 h-20 text-pink-400 transition-transform duration-300 ${
                  dragging ? 'scale-110' : 'scale-100'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full p-2 animate-bounce">
                <span className="text-xs font-bold">AI</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Upload Your Hand Photo
            </h3>
            <p className="text-gray-600 mb-2">
              Get AI-powered design recommendations instantly
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Drag and drop or click to browse • PNG, JPG up to 10MB
            </p>

            <label className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl cursor-pointer hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="font-semibold text-lg">Choose Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Tips */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-gray-600">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">💡</span>
                <span>Good lighting</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🖐️</span>
                <span>Clear hand view</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">⬜</span>
                <span>Plain background</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <div className="relative rounded-2xl overflow-hidden border-4 border-pink-300 shadow-2xl transform transition-transform hover:scale-105">
            <img
              src={preview}
              alt="Uploaded hand"
              className="w-full h-auto max-h-96 object-contain bg-gradient-to-br from-gray-100 to-white"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all transform hover:scale-110 shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Success Badge */}
            <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
              <span className="font-bold">✓ Image Uploaded</span>
            </div>
          </div>
          
          <button
            onClick={clearImage}
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all font-semibold shadow-md"
          >
            🔄 Upload Different Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;