function DesignCard({ design }) {
  return (
    <article className="market-card design-card">
      <div className="design-card-image"><img src={design.imageURL} alt={design.designName} onError={(event) => { event.currentTarget.style.display = "none"; }} /><span>{design.category}</span></div>
      <div className="market-card-content">
        <div className="market-card-heading"><div><h3>{design.designName}</h3><p>Best for {design.suitableHandSize} hands</p></div><span className="design-price">₹{design.basePrice}</span></div>
        <div className="market-card-footer"><span className="muted-label">Signature collection</span><span className="design-card-note">Save this look for your artist</span></div>
      </div>
    </article>
  );
}

export default DesignCard;