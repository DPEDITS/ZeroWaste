function Navbar() {
  return (
    <nav className="glass-nav">
      <div className="ff-nav-inner">
        <a className="ff-logo" href="#">
          <span className="ff-logo-icon">ZW</span>
          ZeroWaste
        </a>
        <ul className="ff-nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Programs</a></li>
          <li><a href="#" className="ff-nav-cta">Get Started</a></li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;