import React from "react";
import "../styles/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            ♻️ <span className="footer-logo-text">ZeroWaste</span>
          </div>
          <p className="footer-tagline">
            Reducing food waste and building stronger communities. Every meal
            saved is a step towards a hunger-free world.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#features">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/signup">Get Started</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><span>Privacy Policy</span></li>
            <li><span>Terms & Conditions</span></li>
            <li><span>Cookie Policy</span></li>
            <li><span>Contact Us</span></li>
          </ul>
        </div>
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