import React, { useState } from "react"
import api from "../api"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .auth-wrap {
    font-family: 'DM Sans', sans-serif;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 8px 0;
  }

  .auth-header {
    margin-bottom: 28px;
    text-align: center;
  }

  .auth-icon {
    width: 52px;
    height: 52px;
    background: #fff0f3;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }

  .auth-title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 26px;
    font-weight: 400;
    color: #1a1a1a;
    margin: 0 0 6px;
  }

  .auth-subtitle {
    font-size: 13px;
    color: #aaa;
    font-weight: 300;
    margin: 0;
  }

  .auth-divider {
    width: 32px;
    height: 2px;
    background: #ffa8b6;
    border-radius: 2px;
    margin: 10px auto 0;
  }

  .auth-field {
    margin-bottom: 18px;
  }

  .auth-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 8px;
  }

  .auth-input-wrap {
    position: relative;
  }

  .auth-input {
    width: 100%;
    padding: 12px 16px 12px 42px;
    border: 1.5px solid #ece8e1;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    background: #fdf8f3;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    box-sizing: border-box;
  }

  .auth-input:focus {
    border-color: #ffa8b6;
    background: #fff;
  }

  .auth-input::placeholder {
    color: #ccc;
    font-weight: 300;
  }

  .auth-input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .auth-error {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff0f0;
    border: 1px solid #ffd0d0;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 16px;
    font-size: 13px;
    color: #c0392b;
    font-weight: 400;
  }

  .auth-submit {
    width: 100%;
    padding: 13px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    margin-bottom: 16px;
  }

  .auth-submit:hover { background: #333; }
  .auth-submit:active { transform: scale(0.99); }
  .auth-submit:disabled { background: #ccc; cursor: not-allowed; }

  .auth-toggle {
    text-align: center;
    font-size: 13px;
    color: #aaa;
    font-weight: 300;
    margin: 0;
  }

  .auth-toggle span {
    color: #d4537e;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s;
  }

  .auth-toggle span:hover { color: #b03060; }

  .auth-separator {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
  }

  .auth-separator-line {
    flex: 1;
    height: 1px;
    background: #f0ebe3;
  }

  .auth-separator-text {
    font-size: 11px;
    color: #ccc;
    font-weight: 400;
    letter-spacing: 0.08em;
  }
`

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)

const CupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="#ffa8b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1" />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
)

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    let endpoint = isSignUp ? "signUp" : "login"
    
    console.log("Calling API:", (api.defaults.baseURL || "http://localhost:5000") + `/${endpoint}`);

    await api.post(`/${endpoint}`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        window.dispatchEvent(new Event("authChange"))
        setIsOpen()
      })
      .catch(err => {
        console.error("API Error:", err);
        const exactError = err.response?.data?.error || err.response?.data?.message || err.message || "Unknown Connection Error";
        setError(exactError)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <style>{styles}</style>
      <div className="auth-wrap">
        <div className="auth-header">
          <div className="auth-icon">
            <CupIcon />
          </div>
          <h2 className="auth-title">
            {isSignUp ? "Create account" : "Welcome back"}
          </h2>
          <p className="auth-subtitle">
            {isSignUp ? "Join the Food Blog community" : "Sign in to your Food Blog account"}
          </p>
          <div className="auth-divider" />
        </div>

        <form onSubmit={handleOnSubmit}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon"><EmailIcon /></span>
              <input
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon"><LockIcon /></span>
              <input
                type="password"
                className="auth-input"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error !== "" && (
            <div className="auth-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="auth-separator">
          <div className="auth-separator-line" />
          <span className="auth-separator-text">or</span>
          <div className="auth-separator-line" />
        </div>

        <p className="auth-toggle">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => { setIsSignUp(prev => !prev); setError("") }}>
            {isSignUp ? "Sign in" : "Sign up"}
          </span>
        </p>
      </div>
    </>
  )
}