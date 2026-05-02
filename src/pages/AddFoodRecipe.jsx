import api from '../api'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── existing styles (unchanged) ── */
  .add-recipe-page {
    min-height: 100vh;
    background: #fdf8f3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 16px 60px;
    font-family: 'DM Sans', sans-serif;
  }
  .add-recipe-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 40px rgba(0,0,0,0.07);
    padding: 48px;
    width: 100%;
    max-width: 580px;
  }
  .add-recipe-header { margin-bottom: 36px; }
  .add-recipe-header h1 {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 32px;
    color: #1a1a1a;
    margin: 0 0 6px;
    font-weight: 400;
  }
  .add-recipe-header p { font-size: 14px; color: #999; margin: 0; font-weight: 300; }
  .add-recipe-divider {
    width: 40px; height: 2px;
    background: #ffa8b6; margin: 12px 0 0; border-radius: 2px;
  }
  .recipe-form-group { margin-bottom: 22px; }
  .recipe-form-group label {
    display: block; font-size: 11px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #888; margin-bottom: 8px;
  }
  .recipe-input {
    width: 100%; padding: 12px 16px;
    border: 1.5px solid #ece8e1; border-radius: 10px;
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    color: #1a1a1a; background: #fdf8f3; outline: none;
    transition: border-color 0.2s, background 0.2s; box-sizing: border-box;
  }
  .recipe-input:focus { border-color: #ffa8b6; background: #fff; }
  .recipe-input::placeholder { color: #ccc; font-weight: 300; }
  textarea.recipe-input { resize: vertical; min-height: 110px; line-height: 1.6; }
  .recipe-file-label {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px; border: 1.5px dashed #ddd; border-radius: 10px;
    cursor: pointer; background: #fdf8f3; transition: border-color 0.2s;
    font-size: 13px; color: #aaa; font-weight: 300;
  }
  .recipe-file-label:hover { border-color: #ffa8b6; color: #888; }
  .recipe-file-label input { display: none; }
  .recipe-file-icon {
    width: 36px; height: 36px; background: #fff0f3;
    border-radius: 8px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0;
  }
  .recipe-file-name {
    color: #555; font-weight: 400; font-size: 13px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px;
  }
  .recipe-submit-btn {
    width: 100%; padding: 14px; background: #1a1a1a; color: #fff;
    border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; letter-spacing: 0.05em;
    cursor: pointer; margin-top: 8px; transition: background 0.2s, transform 0.1s;
  }
  .recipe-submit-btn:hover { background: #333; }
  .recipe-submit-btn:active { transform: scale(0.99); }
  .recipe-submit-btn:disabled { background: #ccc; cursor: not-allowed; }
  .recipe-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 600px) {
    .add-recipe-card { padding: 28px 20px; border-radius: 16px; }
    .add-recipe-header h1 { font-size: 26px; }
    .recipe-row { grid-template-columns: 1fr; gap: 0; }
  }

  /* ── Toast notification ── */
  @keyframes toastSlideIn {
    from { transform: translateX(110%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes toastSlideOut {
    from { transform: translateX(0);    opacity: 1; }
    to   { transform: translateX(110%); opacity: 0; }
  }
  .toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 9999;
    display: flex; align-items: flex-start; gap: 14px;
    background: #fff; border-radius: 14px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.13);
    padding: 16px 20px; max-width: 340px; min-width: 260px;
    border-left: 4px solid #ffa8b6;
    animation: toastSlideIn 0.35s cubic-bezier(.22,1,.36,1) forwards;
    font-family: 'DM Sans', sans-serif;
  }
  .toast.toast-exit {
    animation: toastSlideOut 0.3s ease forwards;
  }
  .toast-icon {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: #fff0f3; margin-top: 1px;
  }
  .toast-body { flex: 1; }
  .toast-title {
    font-size: 13px; font-weight: 500; color: #1a1a1a;
    margin: 0 0 3px; letter-spacing: 0.01em;
  }
  .toast-msg { font-size: 12px; color: #888; margin: 0; font-weight: 300; line-height: 1.5; }
  .toast-close {
    background: none; border: none; cursor: pointer;
    color: #ccc; padding: 0; font-size: 18px; line-height: 1;
    margin-top: -2px; transition: color 0.15s;
  }
  .toast-close:hover { color: #888; }

  /* ── Success modal overlay ── */
  @keyframes overlayFadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes modalBounceIn  {
    0%   { opacity: 0; transform: scale(0.85) translateY(20px); }
    60%  { transform: scale(1.03) translateY(-4px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes checkDraw {
    from { stroke-dashoffset: 60; }
    to   { stroke-dashoffset: 0; }
  }
  .modal-overlay {
    position: fixed; inset: 0; z-index: 10000;
    background: rgba(20, 14, 10, 0.45);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    animation: overlayFadeIn 0.25s ease forwards;
  }
  .modal-card {
    background: #fff; border-radius: 24px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.18);
    padding: 52px 44px 40px;
    text-align: center; max-width: 380px; width: 100%;
    animation: modalBounceIn 0.5s cubic-bezier(.22,1,.36,1) forwards;
  }
  .modal-circle {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg, #ffeef2, #ffd6df);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 24px rgba(255,168,182,0.35);
  }
  .modal-check {
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    animation: checkDraw 0.5s 0.3s ease forwards;
  }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-style: italic; font-size: 26px;
    color: #1a1a1a; font-weight: 400; margin: 0 0 10px;
  }
  .modal-sub {
    font-size: 14px; color: #999; font-weight: 300;
    line-height: 1.6; margin: 0 0 32px;
  }
  .modal-btn {
    padding: 13px 40px; background: #1a1a1a; color: #fff;
    border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; letter-spacing: 0.05em;
    cursor: pointer; transition: background 0.2s, transform 0.1s;
  }
  .modal-btn:hover { background: #333; }
  .modal-btn:active { transform: scale(0.98); }
  .modal-divider {
    width: 32px; height: 2px; background: #ffa8b6;
    border-radius: 2px; margin: 0 auto 20px;
  }
`

/* ── Toast component ── */
function Toast({ title, message, onClose }) {
  const [exiting, setExiting] = useState(false)

  const handleClose = () => {
    setExiting(true)
    setTimeout(onClose, 280)
  }

  // auto-dismiss after 4 s
  React.useEffect(() => {
    const t = setTimeout(handleClose, 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`toast${exiting ? ' toast-exit' : ''}`}>
      <div className="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="#ffa8b6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div className="toast-body">
        <p className="toast-title">{title}</p>
        <p className="toast-msg">{message}</p>
      </div>
      <button className="toast-close" onClick={handleClose}>×</button>
    </div>
  )
}

/* ── Success modal component ── */
function SuccessModal({ onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-circle">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
            stroke="#ffa8b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" className="modal-check"/>
          </svg>
        </div>
        <div className="modal-divider"/>
        <h2 className="modal-title">Recipe Shared!</h2>
        <p className="modal-sub">
          Your culinary creation has been added<br/>and is ready for the world to enjoy.
        </p>
        <button className="modal-btn" onClick={onConfirm}>Back to Home</button>
      </div>
    </div>
  )
}

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("Upload recipe image")
  const [toast, setToast] = useState(null)       // { title, message }
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const showToast = (title, message) => setToast({ title, message })

  const onHandleChange = (e) => {
    if (e.target.name === "file") {
      setFileName(e.target.files[0]?.name || "Upload recipe image")
    }
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value
    setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!recipeData.title || !recipeData.ingredients || !recipeData.instructions || !recipeData.file) {
      showToast("Missing Fields", "Please fill all fields and upload a recipe image before submitting.")
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("title", recipeData.title)
    formData.append("time", recipeData.time)
    formData.append("ingredients", Array.isArray(recipeData.ingredients)
      ? recipeData.ingredients.join(",")
      : recipeData.ingredients)
    formData.append("instructions", recipeData.instructions)
    formData.append("file", recipeData.file)

    try {
      await api.post("/recipe", formData)
      setShowSuccess(true)
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Something went wrong."
      showToast("Couldn't Save Recipe", msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>

      {/* Toast */}
      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Success modal */}
      {showSuccess && <SuccessModal onConfirm={() => navigate("/")} />}

      <div className="add-recipe-page">
        <div className="add-recipe-card">
          <div className="add-recipe-header">
            <h1>Add a Recipe</h1>
            <p>Share your culinary creation with the world</p>
            <div className="add-recipe-divider" />
          </div>
          <form onSubmit={onHandleSubmit}>
            <div className="recipe-row">
              <div className="recipe-form-group">
                <label>Title</label>
                <input type="text" className="recipe-input" name="title"
                  placeholder="e.g. Butter Chicken" onChange={onHandleChange}/>
              </div>
              <div className="recipe-form-group">
                <label>Cook Time</label>
                <input type="text" className="recipe-input" name="time"
                  placeholder="e.g. 30 mins" onChange={onHandleChange}/>
              </div>
            </div>
            <div className="recipe-form-group">
              <label>Ingredients</label>
              <textarea className="recipe-input" name="ingredients" rows="4"
                placeholder={"Enter ingredients separated by commas\ne.g. flour, sugar, butter, eggs"}
                onChange={onHandleChange}/>
            </div>
            <div className="recipe-form-group">
              <label>Instructions</label>
              <textarea className="recipe-input" name="instructions" rows="5"
                placeholder="Describe the steps to prepare this recipe..."
                onChange={onHandleChange}/>
            </div>
            <div className="recipe-form-group">
              <label>Recipe Image</label>
              <label className="recipe-file-label">
                <div className="recipe-file-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#ffa8b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <span className="recipe-file-name">{fileName}</span>
                <input type="file" name="file" accept="image/*" onChange={onHandleChange}/>
              </label>
            </div>
            <button type="submit" className="recipe-submit-btn" disabled={loading}>
              {loading ? "Adding Recipe..." : "Share Recipe"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}