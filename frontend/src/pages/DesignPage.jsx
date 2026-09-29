import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import DesignCard from "../components/DesignCard";

const categories = ["Basic", "Bridal", "Arabic", "Festival", "Floral"];
const handSizes = ["small", "medium", "large"];

function DesignPage() {
  const [designs, setDesigns] = useState([]);
  const [category, setCategory] = useState("");
  const [handSize, setHandSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/designs");
      setDesigns(response.data.data || []);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We could not load designs right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDesigns(); }, []);
  const filteredDesigns = useMemo(() => designs.filter((design) => (!category || design.category === category) && (!handSize || design.suitableHandSize === handSize)), [designs, category, handSize]);

  return (
    <main className="page-surface listing-page">
      <section className="page-intro listing-intro">
        <span className="eyebrow">A little inspiration</span>
        <h1>Start with a pattern you love.</h1>
        <p>Explore a considered collection of mehndi designs, then bring your favourite reference to the artist you choose.</p>
      </section>
      <section className="listing-toolbar"><div className="filter-label">Filter the edit</div><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Every style</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select><select value={handSize} onChange={(event) => setHandSize(event.target.value)}><option value="">Every hand size</option>{handSizes.map((item) => <option key={item} value={item}>{item}</option>)}</select><button className="quiet-button" onClick={() => { setCategory(""); setHandSize(""); }}>Clear filters</button></section>
      <div className="listing-summary"><span><b>{filteredDesigns.length}</b> designs in this edit</span><button className="text-button" onClick={fetchDesigns}>Refresh collection ↻</button></div>
      {loading && <div className="loading-state"><span />Loading designs...</div>}
      {error && <div className="error-state"><p>{error}</p><button className="primary-button" onClick={fetchDesigns}>Try again <span>↗</span></button></div>}
      {!loading && !error && filteredDesigns.length === 0 && <div className="empty-state"><span>✦</span><h2>No designs match those filters.</h2><p>Clear a filter to see the full collection.</p></div>}
      {!loading && !error && filteredDesigns.length > 0 && <div className="market-grid design-grid">{filteredDesigns.map((design) => <DesignCard key={design._id} design={design} />)}</div>}
    </main>
  );
}

export default DesignPage;