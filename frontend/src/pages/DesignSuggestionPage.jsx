import { useState } from "react";
import ImageUploader from "../components/ImageUploader";

const ACCESS_KEY = "z7rgfSYWxzB7ByzdH7Q1k74i51_dJyXaPOZOhCWN2PE";

function DesignSuggestionPage() {
  const [analysis, setAnalysis] = useState(null);
  const [suggestedImages, setSuggestedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async (handSize) => {
    setLoading(true);
    setError("");
    const query = handSize === "small" ? "minimal henna design hand" : handSize === "large" ? "bridal henna full hand" : "mehndi design hand";
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=9`, { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } });
      if (!response.ok) throw new Error("Suggestion service unavailable");
      const data = await response.json();
      setSuggestedImages(data.results.map((image) => ({ url: image.urls.regular, alt: image.alt_description || "Henna design suggestion" })));
    } catch {
      setError("We could not refresh suggestions right now. Your uploaded image is still private to this session.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (imageData) => {
    if (!imageData) {
      setAnalysis(null);
      setSuggestedImages([]);
      return;
    }
    setAnalysis(imageData.analysis);
    fetchSuggestions(imageData.analysis.handSize);
  };

  return (
    <main className="page-surface suggestion-page">
      <section className="page-intro suggestion-intro"><span className="eyebrow">Style Match</span><h1>A little help finding your pattern.</h1><p>Upload a hand photo and we&apos;ll use its proportions to suggest a starting point. You can always browse and choose for yourself.</p></section>
      <section className="suggestion-layout"><div className="surface-card suggestion-uploader"><div className="card-kicker">Step 01 · Upload a reference</div><ImageUploader onImageUpload={handleImageUpload} /><div className="suggestion-privacy"><span>⌁</span><p>Your image is used for this session only. No account photo is saved.</p></div></div><aside className="suggestion-summary"><div className="card-kicker">Step 02 · Your match</div>{analysis ? <><span className="detected-label">Detected hand profile</span><h2>{analysis.handSize} hand</h2><p>We&apos;re looking for designs with the right amount of detail and coverage for you.</p><div className="match-status"><span>●</span> Ready to explore suggestions</div></> : <div className="empty-suggestion"><span>✦</span><h2>Your personalised edit will appear here.</h2><p>Start by uploading a clear photo of your hand.</p></div>}</aside></section>
      {error && <div className="suggestion-error">{error}</div>}
      {loading && <div className="loading-state"><span />Finding your edit...</div>}
      {!loading && suggestedImages.length > 0 && <section className="suggestion-results"><div className="section-heading"><div><span className="eyebrow">Step 03 · Explore</span><h2>Patterns worth saving.</h2></div><p>{suggestedImages.length} suggestions based on your profile</p></div><div className="suggestion-grid">{suggestedImages.map((image) => <article className="suggestion-image" key={image.url}><img src={image.url} alt={image.alt} /></article>)}</div></section>}
    </main>
  );
}

export default DesignSuggestionPage;