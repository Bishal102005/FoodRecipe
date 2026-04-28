import React from "react"

const socialIcons = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  twitter: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
}

const styles = {
  footer: {
    background: "#111",
    borderRadius: "12px",
    overflow: "hidden",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
  },
  main: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1px 1fr 1fr",
    gap: "0",
    padding: "3rem",
    borderBottom: "0.5px solid rgba(255,255,255,0.1)",
  },
  brand: {
    paddingRight: "2.5rem",
  },
  brandTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "26px",
    fontWeight: 400,
    color: "#fff",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  brandItalic: { fontStyle: "italic", color: "#c8b99a" },
  brandDesc: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.7,
    maxWidth: "240px",
    margin: "0 0 1.5rem",
    fontWeight: 300,
  },
  badge: {
    display: "inline-block",
    background: "rgba(200,185,154,0.15)",
    border: "0.5px solid rgba(200,185,154,0.3)",
    color: "#c8b99a",
    fontSize: "11px",
    letterSpacing: "0.08em",
    padding: "5px 12px",
    borderRadius: "20px",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  divider: {
    background: "rgba(255,255,255,0.07)",
    margin: "0 2.5rem",
  },
  col: { paddingLeft: "2.5rem" },
  colHeading: {
    fontSize: "10px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    fontWeight: 500,
    margin: "0 0 1rem",
  },
  colList: { listStyle: "none", padding: 0, margin: 0 },
  colItem: { marginBottom: "10px" },
  colLink: {
    fontSize: "13.5px",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontWeight: 300,
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2rem 3rem",
  },
  copy: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.25)",
    fontWeight: 300,
    letterSpacing: "0.03em",
    margin: 0,
  },
  copyAccent: { color: "rgba(200,185,154,0.6)" },
  socials: { display: "flex", gap: "10px" },
  socialBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "0.5px solid rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "transparent",
    padding: 0,
  },
}

export default function Footer() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <footer style={styles.footer}>
        <div style={styles.main}>
          <div style={styles.brand}>
            <h2 style={styles.brandTitle}>
              Unknown <em style={styles.brandItalic}>Creation</em>
            </h2>
            <p style={styles.brandDesc}>
              Crafting ideas into experiences. Where imagination meets execution.
            </p>
            <span style={styles.badge}>Est. 2026</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.col}>
            <h4 style={styles.colHeading}>Navigate</h4>
            <ul style={styles.colList}>
              {["Home", "Work", "About", "Contact"].map(item => (
                <li key={item} style={styles.colItem}>
                  <a href="#" style={styles.colLink}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.col}>
            <h4 style={styles.colHeading}>Connect</h4>
            <ul style={styles.colList}>
              {["Instagram", "Twitter", "Behance", "LinkedIn"].map(item => (
                <li key={item} style={styles.colItem}>
                  <a href="#" style={styles.colLink}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copy}>
            © 2026 <span style={styles.copyAccent}>Unknown Creation</span> — All rights reserved
          </p>
          <div style={styles.socials}>
            {Object.entries(socialIcons).map(([name, path]) => (
              <button key={name} style={styles.socialBtn} aria-label={name}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="rgba(255,255,255,0.45)">
                  <path d={path} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}