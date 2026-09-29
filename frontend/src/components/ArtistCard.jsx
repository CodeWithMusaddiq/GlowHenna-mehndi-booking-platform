import { useNavigate } from "react-router-dom";

function ArtistCard({ artist }) {
  const navigate = useNavigate();
  const rating = Number(artist.rating || 0);

  return (
    <article className="market-card artist-card">
      <div className="artist-card-visual">
        {artist.sampleImages?.length ? <img src={artist.sampleImages[0]} alt={artist.name} /> : <span>✦</span>}
        <span className={artist.availability ? "availability available" : "availability"}>{artist.availability ? "Available today" : "Currently booked"}</span>
      </div>
      <div className="market-card-content">
        <div className="market-card-heading"><div><h3>{artist.name}</h3><p>{artist.location}</p></div><span className="rating">★ {rating.toFixed(1)}</span></div>
        <div className="tag-row">{(artist.designTypes || []).slice(0, 3).map((type) => <span key={type}>{type}</span>)}</div>
        <div className="market-card-footer"><span>From <b>₹{artist.priceRange?.min || 0}</b></span>{artist.availability && <button className="card-action" onClick={() => navigate(`/booking/${artist._id}`)}>View artist <span>↗</span></button>}</div>
      </div>
    </article>
  );
}

export default ArtistCard;