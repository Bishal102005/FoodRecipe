import api from '../api'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=DM+Sans:wght@300;400;500&display=swap');

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

  .add-recipe-header {
    margin-bottom: 36px;
  }

  .add-recipe-header h1 {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 32px;
    color: #1a1a1a;
    margin: 0 0 6px;
    font-weight: 400;
  }

  .add-recipe-header p {
    font-size: 14px;
    color: #999;
    margin: 0;
    font-weight: 300;
  }

  .add-recipe-divider {
    width: 40px;
    height: 2px;
    background: #ffa8b6;
    margin: 12px 0 0;
    border-radius: 2px;
  }

  .recipe-form-group {
    margin-bottom: 22px;
  }

  .recipe-form-group label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 8px;
  }

  .recipe-input {
    width: 100%;
    padding: 12px 16px;
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

  .recipe-input:focus {
    border-color: #ffa8b6;
    background: #fff;
  }

  .recipe-input::placeholder {
    color: #ccc;
    font-weight: 300;
  }

  textarea.recipe-input {
    resize: vertical;
    min-height: 110px;
    line-height: 1.6;
  }

  .recipe-file-label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: 1.5px dashed #ddd;
    border-radius: 10px;
    cursor: pointer;
    background: #fdf8f3;
    transition: border-color 0.2s;
    font-size: 13px;
    color: #aaa;
    font-weight: 300;
  }

  .recipe-file-label:hover {
    border-color: #ffa8b6;
    color: #888;
  }

  .recipe-file-label input {
    display: none;
  }

  .recipe-file-icon {
    width: 36px;
    height: 36px;
    background: #fff0f3;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .recipe-file-name {
    color: #555;
    font-weight: 400;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  .recipe-submit-btn {
    width: 100%;
    padding: 14px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s, transform 0.1s;
  }

  .recipe-submit-btn:hover {
    background: #333;
  }

  .recipe-submit-btn:active {
    transform: scale(0.99);
  }

  .recipe-submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .recipe-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    .add-recipe-card {
      padding: 28px 20px;
      border-radius: 16px;
    }
    .add-recipe-header h1 {
      font-size: 26px;
    }
    .recipe-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
`

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("Upload recipe image")
  const navigate = useNavigate()

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
      alert("Please fill all fields including image")
      setLoading(false)
      return
    }
    
    const formData = new FormData()
    formData.append("title", recipeData.title)
    formData.append("time", recipeData.time)
    // Send ingredients as comma-separated string
    formData.append("ingredients", Array.isArray(recipeData.ingredients) ? recipeData.ingredients.join(",") : recipeData.ingredients)
    formData.append("instructions", recipeData.instructions)
    formData.append("file", recipeData.file)
    
    console.log("FormData entries:")
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }
    
    try {
      const response = await api.post("/recipe", formData)
      console.log("Recipe created:", response.data)
      alert("Recipe added successfully!")
      navigate("/")
    } catch (err) {
      console.error("Server error:", err.response?.data)
      alert("Error: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
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
                <input
                  type="text"
                  className="recipe-input"
                  name="title"
                  placeholder="e.g. Butter Chicken"
                  onChange={onHandleChange}
                />
              </div>
              <div className="recipe-form-group">
                <label>Cook Time</label>
                <input
                  type="text"
                  className="recipe-input"
                  name="time"
                  placeholder="e.g. 30 mins"
                  onChange={onHandleChange}
                />
              </div>
            </div>

            <div className="recipe-form-group">
              <label>Ingredients</label>
              <textarea
                className="recipe-input"
                name="ingredients"
                rows="4"
                placeholder="Enter ingredients separated by commas&#10;e.g. flour, sugar, butter, eggs"
                onChange={onHandleChange}
              />
            </div>

            <div className="recipe-form-group">
              <label>Instructions</label>
              <textarea
                className="recipe-input"
                name="instructions"
                rows="5"
                placeholder="Describe the steps to prepare this recipe..."
                onChange={onHandleChange}
              />
            </div>

            <div className="recipe-form-group">
              <label>Recipe Image</label>
              <label className="recipe-file-label">
                <div className="recipe-file-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffa8b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <span className="recipe-file-name">{fileName}</span>
                <input type="file" name="file" accept="image/*" onChange={onHandleChange} />
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