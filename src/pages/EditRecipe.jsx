import api from '../api'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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

  .recipe-submit-btn:hover { background: #333; }
  .recipe-submit-btn:active { transform: scale(0.99); }
  .recipe-submit-btn:disabled { background: #ccc; cursor: not-allowed; }

  .recipe-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .recipe-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #aaa;
    font-weight: 400;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
    margin-bottom: 24px;
    transition: color 0.15s;
  }

  .recipe-back-btn:hover { color: #d4537e; }

  @media (max-width: 600px) {
    .add-recipe-card {
      padding: 28px 20px;
      border-radius: 16px;
    }
    .add-recipe-header h1 { font-size: 26px; }
    .recipe-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
`

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [fileName, setFileName] = useState("Change recipe image (optional)")
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/recipe/${id}`)
        let res = response.data
        setRecipeData({
          title: res.title,
          ingredients: Array.isArray(res.ingredients) ? res.ingredients.join(",") : res.ingredients,
          instructions: res.instructions,
          time: res.time
        })
      } catch (err) {
        console.error("Error fetching recipe:", err)
      } finally {
        setFetching(false)
      }
    }
    getData()
  }, [])

  const onHandleChange = (e) => {
    if (e.target.name === "file") {
      setFileName(e.target.files[0]?.name || "Change recipe image (optional)")
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
    try {
      const formData = new FormData()
      formData.append("title", recipeData.title)
      formData.append("time", recipeData.time)
      
      // Handle ingredients array
      if (Array.isArray(recipeData.ingredients)) {
        recipeData.ingredients.forEach(ing => formData.append("ingredients", ing.trim()))
      } else if (typeof recipeData.ingredients === 'string') {
        recipeData.ingredients.split(',').forEach(ing => formData.append("ingredients", ing.trim()))
      }
      
      formData.append("instructions", recipeData.instructions)
      
      // Only append file if it exists and is a File object
      if (recipeData.file && recipeData.file instanceof File) {
        formData.append("file", recipeData.file)
      }
      
      await api.put(`/recipe/${id}`, formData)
      navigate("/myRecipe")
    } catch (err) {
      console.error("Error updating recipe:", err.response?.data)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <>
        <style>{styles}</style>
        <div className="add-recipe-page">
          <div style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", color: "#aaa", fontSize: "14px" }}>
            Loading recipe...
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{styles}</style>
      <div className="add-recipe-page">
        <div className="add-recipe-card">

          <button className="recipe-back-btn" onClick={() => navigate("/myRecipe")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to my recipes
          </button>

          <div className="add-recipe-header">
            <h1>Edit Recipe</h1>
            <p>Update your recipe details below</p>
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
                  value={recipeData.title || ""}
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
                  value={recipeData.time || ""}
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
                placeholder="Separate ingredients with commas"
                value={recipeData.ingredients || ""}
                onChange={onHandleChange}
              />
            </div>

            <div className="recipe-form-group">
              <label>Instructions</label>
              <textarea
                className="recipe-input"
                name="instructions"
                rows="5"
                placeholder="Describe the steps..."
                value={recipeData.instructions || ""}
                onChange={onHandleChange}
              />
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
                <input type="file" name="file" accept="image/*" onChange={onHandleChange} />
              </label>
            </div>

            <button type="submit" className="recipe-submit-btn" disabled={loading}>
              {loading ? "Saving changes..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}