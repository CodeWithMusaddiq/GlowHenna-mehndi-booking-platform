import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import DesignCard from "../components/DesignCard";
import ArtistCard from "../components/ArtistCard";

function FestivalPage() {
  const [designs, setDesigns] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [designResponse, artistResponse] = await Promise.all([api.get("/api/designs/category/Festival"), api.get("/api/artists?limit=60")]);
      setDesigns(designResponse.data.data || []);
      setArtists((artistResponse.data.data || []).filter((artist) => artist.availability));
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We could not load the festival edit.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div className="loading-state page-loading"><span />Loading the festival edit...</div>;
  if (error) return <div className="error-state page-loading"><p>{error}</p><button className="primary-button" onClick={fetchData}>Try again <span>↗</span></button></div>;

  return (
    <main className="page-surface festival-page">
      <section className="festival-banner"><div><span className="eyebrow">Limited seasonal edit</span><h1>Make room for a little more colour.</h1><p>Festival-ready patterns, artists with availability, and a few practical tips for booking ahead.</p></div><div className="festival-badge">Book early<br /><b>peak dates fill fast</b></div></section>
      <section className="notice-strip"><span>✦</span><p>Festival dates may carry a 15% service charge. Wedding season from November to February may add 10%.</p><Link to="/artists">Find an available artist →</Link></section>
      <section className="festival-section"><div className="section-heading"><div><span className="eyebrow">The seasonal collection</span><h2>Patterns for the gathering.</h2></div><p>{designs.length} festival designs selected for this edit.</p></div>{designs.length ? <div className="market-grid">{designs.map((design) => <DesignCard key={design._id} design={design} />)}</div> : <div className="empty-state"><span>✦</span><h2>New festival patterns are on their way.</h2></div>}</section>
      <section className="festival-section"><div className="section-heading"><div><span className="eyebrow">Ready when you are</span><h2>Artists with room for your celebration.</h2></div><Link className="text-button" to="/artists">View all artists ↗</Link></div>{artists.length ? <div className="market-grid">{artists.slice(0, 3).map((artist) => <ArtistCard key={artist._id} artist={artist} />)}</div> : <div className="empty-state"><span>⌁</span><h2>All artists are currently booked.</h2><p>Check back soon for the next available slot.</p></div>}</section>
    </main>
  );
}

export default FestivalPage;