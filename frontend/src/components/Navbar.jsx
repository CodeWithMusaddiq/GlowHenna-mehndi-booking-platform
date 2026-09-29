
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ["Artists", "/artists"],
    ["Designs", "/designs"],
    ["Festival edit", "/festival"],
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" className="site-brand" onClick={closeMenu}>
          <span className="site-brand-mark">✦</span>
          <span>GlowHenna</span>
        </Link>

        <button
          type="button"
          className="nav-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`site-nav-links ${menuOpen ? "is-open" : ""}`}>
          <Link className={location.pathname === "/" ? "is-active" : ""} to="/" onClick={closeMenu}>Home</Link>
          {links.map(([label, path]) => (
            <Link key={path} className={location.pathname.startsWith(path) ? "is-active" : ""} to={path} onClick={closeMenu}>
              {label}
            </Link>
          ))}
          <Link className={location.pathname.startsWith("/design-suggestion") ? "is-active" : ""} to="/design-suggestion" onClick={closeMenu}>Style match</Link>

          {!user ? (
            <div className="nav-auth-actions">
              <Link to="/login" onClick={closeMenu}>Sign in</Link>
              <Link className="nav-cta" to="/register" onClick={closeMenu}>Join GlowHenna</Link>
            </div>
          ) : (
            <button className="nav-logout" onClick={() => { logout(); closeMenu(); }}>Sign out</button>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;