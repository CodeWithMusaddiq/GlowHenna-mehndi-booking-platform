import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import ArtistCard from "../components/ArtistCard";

const locations = ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City", "Kukatpally", "Secunderabad", "Madhapur", "Kondapur", "LB Nagar", "Uppal", "Begumpet", "Mehdipatnam", "Dilsukhnagar", "Ameerpet", "Tolichowki"];
const designTypes = ["Basic", "Bridal", "Arabic", "Festival", "Floral"];

function ArtistPage() {
  const [artists, setArtists] = useState([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/artists?limit=60");
      setArtists(response.data.data || []);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We could not load artists right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArtists(); }, []);

  const filteredArtists = useMemo(() => artists.filter((artist) => {
    const matchesLocation = !location || artist.location?.toLowerCase().includes(location.toLowerCase());
    const matchesType = !type || artist.designTypes?.includes(type);
    return matchesLocation && matchesType;
  }), [artists, location, type]);

  return (
    <main className="page-surface listing-page">
      <section className="page-intro listing-intro">
        <span className="eyebrow">People behind the patterns</span>
        <h1>Find your kind of artist.</h1>
        <p>Browse independent mehndi artists around Hyderabad and compare their availability, signature styles, and starting prices.</p>
      </section>
      <section className="listing-toolbar">
        <div className="search-field"><span>⌕</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Search by area" list="artist-locations" /><datalist id="artist-locations">{locations.map((item) => <option key={item} value={item} />)}</datalist></div>
        <select value={type} onChange={(event) => setType(event.target.value)}><option value="">All styles</option>{designTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        <button className="quiet-button" onClick={() => { setLocation(""); setType(""); }}>Clear filters</button>
      </section>
      <div className="listing-summary"><span><b>{filteredArtists.length}</b> artists to explore</span><span>Hyderabad · updated today</span></div>
      {loading && <div className="loading-state"><span />Loading artists...</div>}
      {error && <div className="error-state"><p>{error}</p><button className="primary-button" onClick={fetchArtists}>Try again <span>↗</span></button></div>}
      {!loading && !error && filteredArtists.length === 0 && <div className="empty-state"><span>⌕</span><h2>No artists match that search.</h2><p>Try a different area or clear the style filter.</p></div>}
      {!loading && !error && filteredArtists.length > 0 && <div className="market-grid">{filteredArtists.map((artist) => <ArtistCard key={artist._id} artist={artist} />)}</div>}
    </main>
  );
}

export default ArtistPage;