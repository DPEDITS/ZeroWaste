import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

const Counter = ({ target, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += Math.ceil(target / 50);
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="stat-box">
      <h2>{count}+</h2>
      <p>{label}</p>
    </div>
  );
};

const Home = () => {
  return (
    <div>

      <Navbar />

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">From Waste to Worth.</h1>
        <p className="hero-sub">
  Every day, tons of perfectly edible food go to waste while millions struggle with hunger. 
  ZeroWaste bridges this gap by connecting food donors with volunteers who ensure that surplus food 
  reaches those in need. Together, we turn waste into opportunity, reduce environmental impact, 
  and create a stronger, more compassionate community.
</p>

        <div className="hero-btns">
          <a href="/signup" className="btn-primary">Get Started</a>
          <a href="/login" className="btn-secondary">Login</a>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <Counter target={1200} label="Meals Saved" />
        <Counter target={350} label="Active Volunteers" />
        <Counter target={200} label="Food Donors" />
      </section>

      {/* ABOUT */}
      <section id="about" className="section about">
        <h2>About ZeroWaste</h2>
        <p>
          ZeroWaste is a smart platform designed to reduce food waste and maximize impact. 
  By connecting donors, volunteers, and communities, we ensure surplus food is redistributed efficiently, 
  sustainably, and responsibly—creating value where it was once wasted.
        </p>

        <div className="about-cards">
          <div className="about-card">
            🌍 Reduce Waste
          </div>
          <div className="about-card">
            🤝 Connect People
          </div>
          <div className="about-card">
            ❤️ Save Lives
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section features">
        <h2>How It Works</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h4>🍱 Donate Food</h4>
            <p>Add surplus food easily.</p>
          </div>

          <div className="feature-card">
            <h4>🚚 Delivery</h4>
            <p>Volunteers pick and deliver.</p>
          </div>

          <div className="feature-card">
            <h4>❤️ Impact</h4>
            <p>Help reduce hunger.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Who can donate food?</h4>
          <p>Anyone including individuals, restaurants, and organizations.</p>
        </div>

        <div className="faq-item">
          <h4>How do volunteers work?</h4>
          <p>They pick up food and deliver it to those in need.</p>
        </div>

        <div className="faq-item">
          <h4>Is this service free?</h4>
          <p>Yes, ZeroWaste is completely free for users.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Be Part of the Change</h2>
        <a href="/signup" className="btn-primary">Join Now</a>
      </section>

     

    </div>
  );
};

export default Home;