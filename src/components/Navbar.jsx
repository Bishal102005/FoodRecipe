import React, { useEffect, useState } from "react"
import Modal from '../components/Modal'
import InputForm from "./InputForm"
import { NavLink } from "react-router-dom"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=DM+Sans:wght@300;400;500&display=swap');

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.97);
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
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .navbar__logo-icon {
    width: 36px;
    height: 36px;
    background: #ffa8b6;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .navbar__logo {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 20px;
    color: #1a1a1a;
    font-weight: 400;
    margin: 0;
  }

  .navbar__links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navbar__links li a {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    text-decoration: none;
    padding: 7px 14px;
    border-radius: 8px;
    transition: background 0.15s, color 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .navbar__links li a:hover {
    background: #fff5f7;
    color: #d4537e;
  }

  .navbar__links li a.active {
    background: #fff5f7;
    color: #d4537e;
    font-weight: 500;
  }

  .navbar__dot {
    width: 5px;
    height: 5px;
    background: #ffa8b6;
    border-radius: 50%;
    display: inline-block;
  }

  .navbar__auth {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 12px;
  }

  .navbar__user-email {
    font-size: 12px;
    color: #999;
    font-weight: 300;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .navbar__auth-btn {
    padding: 8px 18px;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em;
    transition: background 0.15s;
  }

  .navbar__auth-btn--login {
    background: #ffa8b6;
    color: #72243e;
  }

  .navbar__auth-btn--login:hover {
    background: #ff8fa3;
  }

  .navbar__auth-btn--logout {
    background: #1a1a1a;
    color: #fff;
  }

  .navbar__auth-btn--logout:hover {
    background: #333;
  }

  .navbar__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 6px;
    border-radius: 8px;
    transition: background 0.15s;
  }

  .navbar__hamburger:hover {
    background: #f5f0ea;
  }

  .navbar__hamburger .bar {
    display: block;
    width: 22px;
    height: 2px;
    background: #555;
    border-radius: 2px;
    transition: all 0.25s ease;
  }

  .navbar__hamburger .bar.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .navbar__hamburger .bar.open:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .navbar__hamburger .bar.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 0 1.25rem;
      flex-wrap: wrap;
      height: auto;
      min-height: 62px;
    }

    .navbar__hamburger {
      display: flex;
    }

    .navbar__links {
      display: none;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      padding: 8px 0 12px;
      gap: 2px;
      border-top: 1px solid #f5f0ea;
      margin-top: 4px;
    }

    .navbar__links--open {
      display: flex;
    }

    .navbar__links li a {
      padding: 11px 12px;
      border-radius: 8px;
      font-size: 15px;
    }

    .navbar__auth {
      display: none;
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      padding-bottom: 12px;
      margin-left: 0;
    }

    .navbar__auth--open {
      display: flex;
    }

    .navbar__auth-btn {
      width: 100%;
      padding: 12px;
      font-size: 14px;
      text-align: center;
    }

    .navbar__user-email {
      max-width: 100%;
      text-align: center;
      font-size: 13px;
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(!localStorage.getItem("token"))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("token")
      setIsLogin(!token)
      setUser(JSON.parse(localStorage.getItem("user")))
    }

    window.addEventListener("authChange", handleAuthChange)
    window.addEventListener("storage", handleAuthChange)

    return () => {
      window.removeEventListener("authChange", handleAuthChange)
      window.removeEventListener("storage", handleAuthChange)
    }
  }, [])

  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.dispatchEvent(new Event("authChange"))
    } else {
      setIsOpen(true)
    }
    setMenuOpen(false)
  }

  return (
    <>
      <style>{styles}</style>
      <header className="navbar">
        <div className="navbar__logo-wrap">
          <div className="navbar__logo-icon">
            <CupIcon />
          </div>
          <h2 className="navbar__logo">Kitchen Stories</h2>
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={() => {
            if (isLogin) setIsOpen(true)
            setMenuOpen(false)
          }}>
            <NavLink to={!isLogin ? "/myRecipe" : "/"}>
              My Recipe {!isLogin && <span className="navbar__dot" />}
            </NavLink>
          </li>
          <li onClick={() => {
            if (isLogin) setIsOpen(true)
            setMenuOpen(false)
          }}>
            <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink>
          </li>
        </ul>

        <div className={`navbar__auth ${menuOpen ? "navbar__auth--open" : ""}`}>
          {user?.email && (
            <span className="navbar__user-email">{user.email}</span>
          )}
          <button
            className={`navbar__auth-btn ${isLogin ? "navbar__auth-btn--login" : "navbar__auth-btn--logout"}`}
            onClick={checkLogin}
          >
            {isLogin ? "Login" : "Logout"}
          </button>
        </div>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  )
}