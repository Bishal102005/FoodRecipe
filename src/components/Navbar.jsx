import React, { useEffect, useState } from "react"
import Modal from '../components/Modal'
import InputForm from "./InputForm"
import { NavLink } from "react-router-dom"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=DM+Sans:wght@300;400;500&display=swap');

  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    background: rgba(255,255,255,0.97);
    border-bottom: 1px solid #f0ebe3;
    padding: 0 2.5rem;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'DM Sans', sans-serif;
    backdrop-filter: saturate(180%) blur(8px);
  }
  .navbar__logo-wrap {
    display: flex; align-items: center; gap: 10px; text-decoration: none;
  }
  .navbar__logo-icon {
    width: 36px; height: 36px; background: #ffa8b6;
    border-radius: 10px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0;
  }
  .navbar__logo {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 20px; color: #1a1a1a; font-weight: 400; margin: 0;
  }
  .navbar__links {
    display: flex; align-items: center; gap: 4px;
    list-style: none; margin: 0; padding: 0;
  }
  .navbar__links li a {
    font-size: 14px; font-weight: 400; color: #666;
    text-decoration: none; padding: 7px 14px; border-radius: 8px;
    transition: background 0.15s, color 0.15s;
    display: flex; align-items: center; gap: 6px;
  }
  .navbar__links li a:hover { background: #fff5f7; color: #d4537e; }
  .navbar__links li a.active { background: #fff5f7; color: #d4537e; font-weight: 500; }
  .navbar__dot {
    width: 5px; height: 5px; background: #ffa8b6;
    border-radius: 50%; display: inline-block;
  }
  .navbar__auth {
    display: flex; align-items: center; gap: 10px;
  }
  .navbar__user-email {
    font-size: 12px; color: #999; font-weight: 300;
    max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .navbar__auth-btn {
    padding: 8px 18px; border: none; border-radius: 8px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em; transition: background 0.15s;
  }
  .navbar__auth-btn--login { background: #ffa8b6; color: #72243e; }
  .navbar__auth-btn--login:hover { background: #ff8fa3; }
  .navbar__auth-btn--logout { background: #1a1a1a; color: #fff; }
  .navbar__auth-btn--logout:hover { background: #333; }

  /* Hamburger — hidden on desktop */
  .navbar__hamburger {
    display: none;
    flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px;
    border-radius: 8px; transition: background 0.15s; z-index: 1200;
  }
  .navbar__hamburger:hover { background: #fff5f7; }
  .navbar__hamburger .bar {
    display: block; width: 22px; height: 2px;
    background: #555; border-radius: 2px; transition: all 0.25s ease;
  }
  .navbar__hamburger .bar.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .navbar__hamburger .bar.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .navbar__hamburger .bar.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Overlay — hidden by default everywhere */
  .mobile-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1050;
    transition: opacity 0.3s ease;
  }

  /* Drawer — hidden by default everywhere */
  .mobile-drawer {
    display: none;
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 78vw; max-width: 300px;
    background: #fff;
    z-index: 1100;
    flex-direction: column;
    box-shadow: -8px 0 40px rgba(0,0,0,0.15);
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    overflow-y: auto;
  }

  /* Drawer header */
  .mobile-drawer__header {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    border-bottom: 1px solid #f5f0ea;
    flex-shrink: 0;
  }
  .mobile-drawer__brand {
    display: flex; align-items: center; gap: 8px;
  }
  .mobile-drawer__close {
    background: #f5f0ea; border: none;
    width: 32px; height: 32px; border-radius: 8px;
    cursor: pointer; font-size: 16px; color: #888;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .mobile-drawer__close:hover { background: #ffecef; color: #d4537e; }

  /* User card */
  .mobile-drawer__user {
    margin: 16px 16px 4px;
    padding: 12px 14px;
    background: #fff8f9;
    border-radius: 10px;
    border: 1px solid #ffe0e7;
    display: flex; align-items: center; gap: 10px;
    flex-shrink: 0;
  }
  .mobile-drawer__avatar {
    width: 36px; height: 36px; background: #ffa8b6;
    border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-size: 15px;
    color: #72243e; font-weight: 600; flex-shrink: 0;
  }
  .mobile-drawer__user-info { min-width: 0; }
  .mobile-drawer__user-label {
    font-size: 10px; text-transform: uppercase;
    letter-spacing: 0.08em; color: #bbb;
    font-weight: 500; margin-bottom: 2px;
  }
  .mobile-drawer__user-email {
    font-size: 13px; color: #444;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* Nav list */
  .mobile-drawer__nav {
    list-style: none; margin: 12px 0 0;
    padding: 0 12px; flex: 1;
    display: flex; flex-direction: column; gap: 2px;
  }
  .mobile-drawer__nav li a {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 14px; border-radius: 10px;
    font-size: 15px; font-weight: 400;
    color: #444; text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .mobile-drawer__nav li a:hover,
  .mobile-drawer__nav li a.active {
    background: #fff5f7; color: #d4537e; font-weight: 500;
  }
  .mobile-drawer__nav-icon {
    font-size: 18px; width: 24px;
    text-align: center; flex-shrink: 0;
  }
  .mobile-drawer__nav-dot {
    width: 6px; height: 6px; background: #ffa8b6;
    border-radius: 50%; margin-left: auto;
  }

  /* Footer */
  .mobile-drawer__footer {
    padding: 16px 16px 36px;
    border-top: 1px solid #f5f0ea;
    flex-shrink: 0;
  }
  .mobile-drawer__auth-btn {
    width: 100%; padding: 14px; border: none;
    border-radius: 10px; font-size: 15px; font-weight: 500;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em; transition: background 0.15s;
  }
  .mobile-drawer__auth-btn--login { background: #ffa8b6; color: #72243e; }
  .mobile-drawer__auth-btn--login:hover { background: #ff8fa3; }
  .mobile-drawer__auth-btn--logout { background: #1a1a1a; color: #fff; }
  .mobile-drawer__auth-btn--logout:hover { background: #333; }

  /* ── Mobile breakpoint ── */
  @media (max-width: 768px) {
    .navbar { padding: 0 1.25rem; }
    .navbar__hamburger { display: flex; }
    .navbar__links { display: none !important; }
    .navbar__auth  { display: none !important; }

    /* Show overlay when open */
    .mobile-overlay.visible { display: block; }

    /* Show drawer when open */
    .mobile-drawer.open {
      display: flex;
      transform: translateX(0);
    }
  }
`

const CupIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1"/>
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
)

const navItems = [
  { to: "/",          label: "Home",       icon: "🏠", authRequired: false },
  { to: "/myRecipe",  label: "My Recipe",  icon: "📖", authRequired: true, dot: true },
  { to: "/favRecipe", label: "Favourites", icon: "❤️", authRequired: true },
]

const parseLocalStorageJSON = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLogin,  setIsLogin]  = useState(!localStorage.getItem("token"))
  const [user,     setUser]     = useState(parseLocalStorageJSON("user"))

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLogin(!localStorage.getItem("token"))
      setUser(parseLocalStorageJSON("user"))
    }
    window.addEventListener("authChange", handleAuthChange)
    window.addEventListener("storage",    handleAuthChange)
    return () => {
      window.removeEventListener("authChange", handleAuthChange)
      window.removeEventListener("storage",    handleAuthChange)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.dispatchEvent(new Event("authChange"))
    } else {
      setIsOpen(true)
    }
    closeMenu()
  }

  const userInitial = user?.email?.[0]?.toUpperCase() || "?"

  return (
    <>
      <style>{styles}</style>

      {/* ── Desktop / shared navbar bar ── */}
      <header className="navbar">
        <div className="navbar__logo-wrap">
          <div className="navbar__logo-icon"><CupIcon /></div>
          <h2 className="navbar__logo">Kitchen Story</h2>
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span className={`bar ${menuOpen ? "open" : ""}`} />
          <span className={`bar ${menuOpen ? "open" : ""}`} />
          <span className={`bar ${menuOpen ? "open" : ""}`} />
        </button>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navItems.map(({ to, label, authRequired, dot }) => (
            <li key={to} onClick={() => { if (authRequired && isLogin) setIsOpen(true) }}>
              <NavLink to={authRequired && isLogin ? "/" : to}>
                {label} {dot && !isLogin && <span className="navbar__dot" />}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop auth */}
        <div className="navbar__auth">
          {user?.email && <span className="navbar__user-email">{user.email}</span>}
          <button
            className={`navbar__auth-btn ${isLogin ? "navbar__auth-btn--login" : "navbar__auth-btn--logout"}`}
            onClick={checkLogin}
          >
            {isLogin ? "Login" : "Logout"}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`mobile-overlay ${menuOpen ? "visible" : ""}`}
        onClick={closeMenu}
      />

      {/* ── Mobile drawer ── */}
      <nav className={`mobile-drawer ${menuOpen ? "open" : ""}`}>

        {/* Header */}
        <div className="mobile-drawer__header">
          <div className="mobile-drawer__brand">
            <div className="navbar__logo-icon"><CupIcon /></div>
            <h2 className="navbar__logo">Kitchen Story</h2>
          </div>
          <button className="mobile-drawer__close" onClick={closeMenu} aria-label="Close">✕</button>
        </div>

        {/* User card */}
        {user?.email && (
          <div className="mobile-drawer__user">
            <div className="mobile-drawer__avatar">{userInitial}</div>
            <div className="mobile-drawer__user-info">
              <div className="mobile-drawer__user-label">Signed in as</div>
              <div className="mobile-drawer__user-email">{user.email}</div>
            </div>
          </div>
        )}

        {/* Nav links */}
        <ul className="mobile-drawer__nav">
          {navItems.map(({ to, label, icon, authRequired, dot }) => (
            <li key={to} onClick={() => {
              if (authRequired && isLogin) { setIsOpen(true) }
              closeMenu()
            }}>
              <NavLink to={authRequired && isLogin ? "/" : to}>
                <span className="mobile-drawer__nav-icon">{icon}</span>
                {label}
                {dot && !isLogin && <span className="mobile-drawer__nav-dot" />}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Footer with auth button */}
        <div className="mobile-drawer__footer">
          <button
            className={`mobile-drawer__auth-btn ${isLogin ? "mobile-drawer__auth-btn--login" : "mobile-drawer__auth-btn--logout"}`}
            onClick={checkLogin}
          >
            {isLogin ? "Login / Sign up" : "Logout"}
          </button>
        </div>

      </nav>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  )
}