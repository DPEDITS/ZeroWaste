import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-col">
          <h3>ZeroWaste</h3>
          <p>Reducing food waste and helping communities grow.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <p>About</p>
          <p>Features</p>
          <p>Contact</p>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>

        <div className="footer-col">
          <h4>Subscribe</h4>
          <input placeholder="Your email" />
          <button>Subscribe</button>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 ZeroWaste. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;