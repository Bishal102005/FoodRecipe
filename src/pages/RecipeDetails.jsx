import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const getRecipe = async () => {
    try {
      const res = await api.get(`/recipe/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }
  };

  useEffect(() => {
    getRecipe();
  }, [id]);

  if (!recipe)
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>
    );

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        {/* TITLE */}
        <h1 style={styles.title}>{recipe.title}</h1>

        {/* IMAGE */}
        {recipe.coverImage && (
          <div style={styles.imageWrapper}>
            <img
              src={recipe.coverImage.startsWith('http') ? recipe.coverImage : `${api.defaults.baseURL}/images/${recipe.coverImage}`}
              alt={recipe.title}
              style={styles.image}
            />
          </div>
        )}

        {/* TIME */}
        <div style={styles.timeBox}>
          <span style={styles.timeText}>⏱ Time Required: {recipe.time}</span>
        </div>

        {/* INGREDIENTS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🧂 Ingredients</h2>
          <hr style={styles.divider} />

          {Array.isArray(recipe.ingredients) ? (
            <ul style={styles.list}>
              {recipe.ingredients.map((item, idx) => (
                <li key={idx} style={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.text}>{recipe.ingredients}</p>
          )}
        </section>

                <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🔥 Process</h2>
        <hr style={styles.divider} />

        <ul style={styles.list}>
            {(Array.isArray(recipe.instructions)
            ? recipe.instructions
            : recipe.instructions.split(/\r?\n/)
            )
            .filter((step) => step.trim() !== "")
            .map((step, i) => (
                <li key={i} style={styles.listItem}>
                {step}
                </li>
            ))}
        </ul>
        </section>
            </div>
    </div>
  );
}

/* ---------------------------------------------------------
   STYLES (Fully responsive + attractive)
--------------------------------------------------------- */

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    paddingTop: "100px",
    background: "#fafafa",
    minHeight: "100vh",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "18px",
    width: "100%",
    maxWidth: "850px",
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "20px",
    color: "#222",
  },

  imageWrapper: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "16px",
    marginBottom: "25px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
  },

  timeBox: {
    background: "#fff4dd",
    padding: "12px 16px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "30px",
  },

  timeText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#a76700",
  },

  section: {
    marginBottom: "35px",
  },

  sectionTitle: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
  },

  divider: {
    border: "none",
    height: "2px",
    background: "#eee",
    marginBottom: "15px",
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#555",
  },

  list: {
    paddingLeft: "20px",
  },

  listItem: {
    marginBottom: "8px",
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#444",
  },
};