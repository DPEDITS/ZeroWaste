import React, { useEffect, useState, useRef } from "react";
import "../styles/home.css";

import heroImg from "../assets/hero_food_donation.png";
import donateImg from "../assets/donate_food.png";
import deliveryImg from "../assets/delivery_volunteer.png";
import impactImg from "../assets/community_impact.png";

/* ── Animated Counter ── */
const Counter = ({ target, label, icon, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2200;
          const stepTime = Math.max(Math.floor(duration / target), 20);
          const timer = setInterval(() => {
            start += Math.ceil(target / 60);
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="impact-item" ref={ref}>
      <div className="impact-icon">{icon}</div>
      <div className="impact-number">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="impact-label">{label}</div>
    </div>
  );
};

/* ── FAQ Item ── */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item-ngo ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <h4>{question}</h4>
        <span className="faq-chevron">▼</span>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

/* ── Main Home Page ── */
const Home = () => {
  return (
    <div>

      {/* ═══════════ HERO ═══════════ */}
      <section className="ngo-hero">
        <div className="hero-grid">

          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              Actively serving communities across India
            </div>

            <h1 className="ngo-hero-title">
              Turning Surplus Food Into <span className="highlight">Hope</span>
            </h1>

            <p className="hero-desc">
              Every day, tons of perfectly edible food go to waste while millions
              struggle with hunger. ZeroWaste bridges this gap by connecting food
              donors with volunteers who ensure surplus food reaches those in need.
            </p>

            <div className="hero-actions">
              <a href="/signup" className="btn-donate">
                🤝 Start Donating
              </a>
              <a href="#about" className="btn-learn">
                Learn More →
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span className="trust-avatar">👩</span>
                <span className="trust-avatar">👨</span>
                <span className="trust-avatar">👧</span>
                <span className="trust-avatar">🧑</span>
              </div>
              <div className="trust-text">
                <strong>350+ volunteers</strong> already making a difference
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              src={heroImg}
              alt="Volunteers distributing food to community members"
            />
            <div className="hero-float-card">
              <div className="float-icon">🍱</div>
              <div className="float-info">
                <span className="float-number">1,200+</span>
                <span className="float-label">Meals saved this month</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ IMPACT STATS ═══════════ */}
      <section className="impact-strip">
        <div className="impact-grid">
          <Counter target={1200} label="Meals Saved" icon="🍽️" />
          <Counter target={350} label="Active Volunteers" icon="🙋" />
          <Counter target={200} label="Food Donors" icon="🏪" />
          <Counter target={50} label="Communities Served" icon="🏘️" />
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="ngo-section about-section">
        <div className="about-layout">

          <div className="about-visual">
            <img
              src={impactImg}
              alt="Community members receiving food donations"
              className="about-main-image"
            />
            <div className="about-accent-card">
              <div className="accent-icon">🌱</div>
              <div className="accent-text">
                Reducing food waste<br />since 2024
              </div>
            </div>
          </div>

          <div className="about-content">
            <div className="section-eyebrow">
              <span className="line"></span>
              About Us
            </div>
            <h2 className="ngo-section-title">
              A Mission to End Hunger,<br />One Meal at a Time
            </h2>
            <p className="ngo-section-desc">
              ZeroWaste is a smart platform designed to reduce food waste and
              maximize impact. By connecting donors, volunteers, and communities,
              we ensure surplus food is redistributed efficiently, sustainably,
              and responsibly.
            </p>

            <div className="about-features-grid">
              <div className="about-feature">
                <div className="af-icon green">🌍</div>
                <div className="af-text">
                  <h4>Reduce Waste</h4>
                  <p>Redirecting surplus food from landfills to families</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="af-icon orange">🤝</div>
                <div className="af-text">
                  <h4>Connect People</h4>
                  <p>Bridging the gap between donors and those in need</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="af-icon blue">🚚</div>
                <div className="af-text">
                  <h4>Swift Delivery</h4>
                  <p>Volunteer-powered logistics for timely distribution</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="af-icon pink">❤️</div>
                <div className="af-text">
                  <h4>Save Lives</h4>
                  <p>Nourishing communities one meal at a time</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="features" className="ngo-section how-section">
        <div className="how-header">
          <div className="section-eyebrow">
            <span className="line"></span>
            How It Works
          </div>
          <h2 className="ngo-section-title">Three Simple Steps to Make a Difference</h2>
          <p className="ngo-section-desc">
            Our streamlined process makes it easy for anyone to contribute to
            ending food waste and hunger in their community.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <img src={donateImg} alt="Donate food illustration" className="step-image" />
            <h3>Donate Food</h3>
            <p>
              Restaurants, individuals, and organizations list their surplus food
              on our platform in just a few clicks.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <img src={deliveryImg} alt="Volunteer delivery illustration" className="step-image" />
            <h3>Volunteer Picks Up</h3>
            <p>
              Our dedicated volunteers claim the listing, pick up the food, and
              ensure safe transportation to those who need it.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <img src={impactImg} alt="Community impact illustration" className="step-image" />
            <h3>Community Impact</h3>
            <p>
              Families and communities receive nutritious meals, reducing hunger
              and environmental waste simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="ngo-section faq-section">
        <div className="faq-layout">

          <div>
            <div className="section-eyebrow">
              <span className="line"></span>
              FAQ
            </div>
            <h2 className="ngo-section-title">
              Frequently Asked Questions
            </h2>
            <p className="ngo-section-desc">
              Everything you need to know about ZeroWaste and how you can
              contribute to reducing food waste in your community.
            </p>
          </div>

          <div className="faq-list">
            <FAQItem
              question="Who can donate food?"
              answer="Anyone can donate! Whether you're an individual with leftover food from an event, a restaurant with surplus inventory, or an organization — every contribution helps feed someone in need."
            />
            <FAQItem
              question="How do volunteers work?"
              answer="Volunteers sign up on our platform and can browse available food listings in their area. They claim a listing, pick up the food from the donor, and deliver it to designated distribution points or directly to families."
            />
            <FAQItem
              question="Is this service free?"
              answer="Absolutely! ZeroWaste is completely free for both donors and recipients. Our mission is to eliminate the barriers between surplus food and hunger."
            />
            <FAQItem
              question="How do you ensure food safety?"
              answer="All donors provide details about the food type, preparation time, and storage conditions. Volunteers follow our food handling guidelines, and distribution happens within safe time windows."
            />
            <FAQItem
              question="Can I volunteer in my area?"
              answer="Yes! We're actively expanding across India. Sign up as a volunteer, and you'll be able to see food listings near you and start making deliveries right away."
            />
          </div>

        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="ngo-cta">
        <div className="cta-content">
          <h2 className="ngo-section-title">
            Be Part of the Change
          </h2>
          <p className="cta-desc">
            Join thousands of compassionate individuals who are already making a
            difference. Whether you donate food or volunteer your time, every
            action counts.
          </p>
          <div className="cta-buttons">
            <a href="/signup" className="btn-cta-primary">
              🌱 Join ZeroWaste
            </a>
            <a href="/login" className="btn-cta-secondary">
              Already a member? Login →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;