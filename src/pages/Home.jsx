import React from 'react'
import foodRecipe from '../assets/food.png'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

  .home-page {
    font-family: 'DM Sans', sans-serif;
    background: #fdf8f3;
    min-height: 100vh;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 92vh;
    display: flex;
    align-items: center;
    padding: 120px 6vw 80px;
    overflow: hidden;
  }

  .hero-bg-circle {
    position: absolute;
    border-radius: 50%;
    background: #ffa8b6;
    opacity: 0.08;
    pointer-events: none;
  }

  .hero-bg-circle-1 {
    width: 600px;
    height: 600px;
    top: -100px;
    right: -100px;
  }

  .hero-bg-circle-2 {
    width: 300px;
    height: 300px;
    bottom: 60px;
    left: -80px;
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .hero-left {
    animation: fadeUp 0.8s ease both;
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #fff0f3;
    border: 1px solid #ffd6df;
    color: #c0506e;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 24px;
  }

  .hero-tag-dot {
    width: 6px;
    height: 6px;
    background: #ffa8b6;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 5vw, 64px);
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.15;
    margin: 0 0 8px;
    letter-spacing: -1px;
  }

  .hero-title-italic {
    font-style: italic;
    color: #d4537e;
  }

  .hero-desc {
    font-size: 15px;
    color: #777;
    line-height: 1.8;
    font-weight: 300;
    max-width: 480px;
    margin: 20px 0 36px;
  }

  .hero-desc em {
    font-style: italic;
    color: #555;
    font-weight: 400;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: background 0.2s, transform 0.15s;
  }

  .btn-primary:hover {
    background: #333;
    transform: translateY(-1px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 24px;
    background: transparent;
    color: #555;
    border: 1.5px solid #e8e0d6;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, transform 0.15s;
  }

  .btn-secondary:hover {
    border-color: #ffa8b6;
    color: #d4537e;
    transform: translateY(-1px);
  }

  .hero-stats {
    display: flex;
    gap: 32px;
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid #f0e8de;
  }

  .hero-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    display: block;
    line-height: 1;
    margin-bottom: 4px;
  }

  .hero-stat-label {
    font-size: 12px;
    color: #aaa;
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  .hero-right {
    position: relative;
    display: flex;
    justify-content: center;
    animation: fadeUp 0.8s 0.2s ease both;
  }

  .hero-img-wrap {
    position: relative;
    width: 420px;
    height: 420px;
  }

  .hero-img-bg {
    position: absolute;
    inset: 0;
    background: #ffa8b6;
    border-radius: 40% 60% 55% 45% / 45% 40% 60% 55%;
    opacity: 0.15;
    animation: morphBlob 8s ease-in-out infinite;
  }

  .hero-img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(212,83,126,0.15));
    animation: float 6s ease-in-out infinite;
  }

  .hero-badge {
    position: absolute;
    background: #fff;
    border-radius: 14px;
    padding: 12px 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 2;
  }

  .hero-badge-1 {
    top: 30px;
    right: -10px;
    animation: fadeUp 0.8s 0.5s ease both;
  }

  .hero-badge-2 {
    bottom: 50px;
    left: -20px;
    animation: fadeUp 0.8s 0.7s ease both;
  }

  .hero-badge-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .hero-badge-icon-pink { background: #fff0f3; }
  .hero-badge-icon-amber { background: #fff8ee; }

  .hero-badge-title {
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a;
    display: block;
    margin-bottom: 2px;
  }

  .hero-badge-sub {
    font-size: 11px;
    color: #aaa;
    font-weight: 300;
  }

  /* ── WAVE ── */
  .wave-section {
    line-height: 0;
    margin-top: -2px;
  }

  /* ── RECIPE SECTION ── */
  .recipe-section {
    background: #fff;
    padding: 64px 6vw 80px;
  }

  .recipe-section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .recipe-section-tag {
    display: inline-block;
    background: #fff0f3;
    color: #c0506e;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 14px;
  }

  .recipe-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 12px;
    letter-spacing: -0.5px;
  }

  .recipe-section-title em {
    font-style: italic;
    color: #d4537e;
  }

  .recipe-section-desc {
    font-size: 15px;
    color: #999;
    font-weight: 300;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .recipe-section-divider {
    width: 40px;
    height: 2px;
    background: #ffa8b6;
    border-radius: 2px;
    margin: 16px auto 0;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-16px); }
  }

  @keyframes morphBlob {
    0%, 100% { border-radius: 40% 60% 55% 45% / 45% 40% 60% 55%; }
    33%       { border-radius: 55% 45% 40% 60% / 60% 55% 45% 40%; }
    66%       { border-radius: 45% 55% 60% 40% / 40% 60% 55% 45%; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .hero { padding: 100px 5vw 60px; min-height: auto; }
    .hero-inner { grid-template-columns: 1fr; gap: 40px; text-align: center; }
    .hero-desc { margin-left: auto; margin-right: auto; }
    .hero-actions { justify-content: center; }
    .hero-stats { justify-content: center; }
    .hero-right { display: none; }
    .hero-tag { margin-left: auto; margin-right: auto; }
  }

  @media (max-width: 480px) {
    .hero { padding: 90px 20px 50px; }
    .hero-stats { gap: 20px; }
    .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
    .recipe-section { padding: 48px 20px 60px; }
  }
`

export default function Home() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const addRecipe = () => {
    let token = localStorage.getItem("token")
    if (token) {
      navigate("/addRecipe")
    } else {
      setIsOpen(true)
    }
  }

  const scrollToRecipes = () => {
    document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <style>{styles}</style>
      <div className="home-page">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg-circle hero-bg-circle-1" />
          <div className="hero-bg-circle hero-bg-circle-2" />

          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-tag">
                <span className="hero-tag-dot" />
                Home Cooking Community
              </div>

              <h1 className="hero-title">
                Recipes made<br />
                with <span className="hero-title-italic">love</span> &amp;<br />
                shared with heart
              </h1>

              <p className="hero-desc">
                The best meals aren't found in restaurants — they're made at home,
                with love, with laughter, and with recipes worth passing down.
                <em> It's the smell of something slow-cooking on a Sunday afternoon.</em>
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={addRecipe}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Share your recipe
                </button>
                <button className="btn-secondary" onClick={scrollToRecipes}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  Browse recipes
                </button>
              </div>

              <div className="hero-stats">
                <div>
                  <span className="hero-stat-num">500+</span>
                  <span className="hero-stat-label">Recipes shared</span>
                </div>
                <div>
                  <span className="hero-stat-num">120+</span>
                  <span className="hero-stat-label">Home cooks</span>
                </div>
                <div>
                  <span className="hero-stat-num">50+</span>
                  <span className="hero-stat-label">Cuisines</span>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-img-wrap">
                <div className="hero-img-bg" />
                <img src={foodRecipe} className="hero-img" alt="food recipe" />

                <div className="hero-badge hero-badge-1">
                  <div className="hero-badge-icon hero-badge-icon-pink">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="#ffa8b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="hero-badge-title">Made with love</span>
                    <span className="hero-badge-sub">Home kitchen recipes</span>
                  </div>
                </div>

                <div className="hero-badge hero-badge-2">
                  <div className="hero-badge-icon hero-badge-icon-amber">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <div>
                    <span className="hero-badge-title">Top rated</span>
                    <span className="hero-badge-sub">Community favourites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAVE ── */}
        <div className="wave-section">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none"
            style={{ width: "100%", display: "block", background: "#fdf8f3" }}>
            <path fill="#ffffff" fillOpacity="1"
              d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>

        {/* ── RECIPES ── */}
        <section className="recipe-section" id="recipes">
          <div className="recipe-section-header">
            <span className="recipe-section-tag">Fresh from the kitchen</span>
            <h2 className="recipe-section-title">
              Discover <em>delicious</em> recipes
            </h2>
            <p className="recipe-section-desc">
              Real recipes from real kitchens — browse, save your favourites,
              and share the dishes that define you.
            </p>
            <div className="recipe-section-divider" />
          </div>
          <RecipeItems />
        </section>

      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  )
}