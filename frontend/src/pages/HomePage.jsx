import { Link } from "react-router-dom";

const quickActions = [
  { number: "01", title: "Browse artists", text: "Compare availability, style, and pricing.", path: "/artists" },
  { number: "02", title: "Pick a design", text: "Save inspiration for your occasion.", path: "/designs" },
  { number: "03", title: "Book your slot", text: "Share the details and let us handle the rest.", path: "/booking" },
];

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="eyebrow">Mehndi, made personal</span>
          <h1>Your occasion deserves a design that feels like you.</h1>
          <p>
            Discover local artists, explore real inspiration, and book a beautiful
            mehndi session without the back-and-forth.
          </p>
          <div className="home-actions">
            <Link className="primary-button" to="/artists">Find an artist <span>→</span></Link>
            <Link className="text-button" to="/design-suggestion">Find my style <span>↗</span></Link>
          </div>
          <div className="home-trust-line">
            <span><b>4.8/5</b> community rating</span>
            <span className="trust-divider" />
            <span>Local artists. Clear pricing.</span>
          </div>
        </div>
        <div className="home-hero-art" aria-label="Henna-inspired pattern artwork">
          <div className="hero-art-arch" />
          <div className="hero-art-card hero-art-card-top">Bridal edit <b>↗</b></div>
          <div className="hero-art-card hero-art-card-bottom"><span>03</span> Hand-picked details</div>
          <div className="hero-art-hand">❋</div>
          <div className="hero-art-ring ring-one" />
          <div className="hero-art-ring ring-two" />
        </div>
      </section>

      <section className="home-section home-process">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The GlowHenna way</span>
            <h2>From first idea to finished detail.</h2>
          </div>
          <p>Everything you need to make a confident choice, in one calm place.</p>
        </div>
        <div className="process-grid">
          {quickActions.map((action) => (
            <Link to={action.path} className="process-item" key={action.number}>
              <span className="process-number">{action.number}</span>
              <div><h3>{action.title}</h3><p>{action.text}</p></div>
              <span className="process-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-feature-band">
        <div className="feature-copy">
          <span className="eyebrow">For the details people remember</span>
          <h2>Good design starts with a good match.</h2>
          <p>
            Tell us the mood, browse designs by hand size, or use Style Match
            for a quick starting point. You stay in control at every step.
          </p>
          <Link className="outlined-button" to="/artists">Meet the artists <span>→</span></Link>
        </div>
        <div className="feature-list">
          <div><span>✦</span><div><b>Curated by occasion</b><p>Bridal, festival, Arabic, and everyday edits.</p></div></div>
          <div><span>✦</span><div><b>Transparent estimates</b><p>See what changes your quote before you book.</p></div></div>
          <div><span>✦</span><div><b>Artists you can compare</b><p>Location, availability, range, and signature style.</p></div></div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;