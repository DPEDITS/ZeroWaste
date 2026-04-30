import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            ♻️ <span className="footer-logo-text">ZeroWaste</span>
          </div>
          <p className="footer-tagline">
            Reducing food waste and building stronger communities. Every meal
            saved is a step towards a hunger-free world.
          </p>
          <div className="footer-social">
            <span className="social-icon">📘</span>
            <span className="social-icon">🐦</span>
            <span className="social-icon">📸</span>
            <span className="social-icon">💼</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#features">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/signup">Get Started</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><span>Privacy Policy</span></li>
            <li><span>Terms & Conditions</span></li>
            <li><span>Cookie Policy</span></li>
            <li><span>Contact Us</span></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="footer-col footer-subscribe">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for latest updates on our mission.</p>
          <div className="subscribe-form">
            <input placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span className="footer-bottom-text">
          © 2026 ZeroWaste. All rights reserved.
        </span>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;