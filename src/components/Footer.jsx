import React, { useEffect, useRef, useState } from "react"

const socialIcons = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  twitter: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
}

const styles = {
  footer: {
    background: "linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 50%, #121212 100%)",
    borderRadius: "24px",
    overflow: "hidden",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 80%, rgba(200,185,154,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,185,154,0.06) 0%, transparent 50%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  topBar: {
    background: "linear-gradient(90deg, rgba(200,185,154,0.15) 0%, rgba(200,185,154,0.05) 50%, rgba(200,185,154,0.02) 100%)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(200,185,154,0.15)",
    padding: "16px 3rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    zIndex: 1,
  },
  topDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #c8b99a, #d4c4a8)",
    boxShadow: "0 0 12px rgba(200,185,154,0.4)",
    position: "relative",
  },
  pulseRing: {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(200,185,154,0.3)",
    width: "20px",
    height: "20px",
    top: "-6px",
    left: "-6px",
  },
  topText: {
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    background: "linear-gradient(135deg, #c8b99a, #d4c4a8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 600,
  },
  main: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1px 1fr 1fr",
    padding: "3.5rem 3rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    gap: "0",
    position: "relative",
    zIndex: 1,
  },
  brand: {
    paddingRight: "2.5rem",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },
  logoIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, rgba(200,185,154,0.2) 0%, rgba(200,185,154,0.1) 100%)",
    border: "1px solid rgba(200,185,154,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(200,185,154,0.15)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  brandTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "28px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #fff 0%, #f8f5f0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
    lineHeight: 1.1,
    letterSpacing: "-0.5px",
  },
  brandItalic: {
    fontStyle: "italic",
    fontWeight: 500,
    background: "linear-gradient(135deg, #c8b99a, #d4c4a8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  brandDesc: {
    fontSize: "14px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1.8,
    maxWidth: "260px",
    margin: "0 0 1.8rem",
    fontWeight: 300,
  },
  badges: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  badgeGold: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "25px",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 600,
    background: "linear-gradient(135deg, rgba(200,185,154,0.2) 0%, rgba(200,185,154,0.1) 100%)",
    border: "1px solid rgba(200,185,154,0.4)",
    color: "#c8b99a",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(200,185,154,0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  badgeWhite: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "25px",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 600,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
    boxShadow: "0 0 8px currentColor",
  },
  divider: {
    background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.03), rgba(255,255,255,0.1))",
    margin: "0 2.5rem",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  col: {
    paddingLeft: "2.5rem",
  },
  colHeading: {
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 600,
    margin: "0 0 1.5rem",
  },
  colList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  colItem: {
    marginBottom: "12px",
  },
  colLink: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontWeight: "400",
    position: "relative",
    display: "inline-block",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  gradientLine: {
    height: "2px",
    background: "linear-gradient(90deg, transparent 0%, rgba(200,185,154,0.6) 30%, rgba(200,185,154,0.8) 50%, rgba(200,185,154,0.6) 70%, transparent 100%)",
    boxShadow: "0 1px 10px rgba(200,185,154,0.3)",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem 3rem",
    position: "relative",
    zIndex: 1,
  },
  copy: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.3)",
    fontWeight: "400",
    letterSpacing: "0.04em",
    margin: 0,
  },
  copyAccent: {
    background: "linear-gradient(135deg, #c8b99a, #d4c4a8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 500,
  },
  websiteLink: {
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
  socials: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  socialBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "rgba(255,255,255,0.04)",
    padding: 0,
    backdropFilter: "blur(20px)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  },
  socialBtnHover: {
    background: "linear-gradient(135deg, rgba(200,185,154,0.25) 0%, rgba(200,185,154,0.15) 100%)",
    borderColor: "rgba(200,185,154,0.5)",
    transform: "translateY(-4px) scale(1.05)",
    boxShadow: "0 15px 35px rgba(200,185,154,0.3)",
  },
  // Animation styles
  animatedElement: {
    opacity: 0,
    transform: "translateY(30px)",
    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  animatedElementVisible: {
    opacity: 1,
    transform: "translateY(0)",
  },
}

const globalAnimations = `
  @keyframes pulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes pulseRing {
    0% {
      transform: scale(0.33);
      opacity: 1;
    }
    80%, 100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`

export default function Footer() {
  const [hoveredLink, setHoveredLink] = React.useState(null)
  const [hoveredSocial, setHoveredSocial] = React.useState(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const footerRef = useRef(null)

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animationStyle = (index = 0) => ({
    ...styles.animatedElement,
    ...(isVisible && {
      ...styles.animatedElementVisible,
      transitionDelay: `${index * 0.08}s`,
    }),
  })

  return (
    <>
      <style>{globalAnimations}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <footer ref={footerRef} style={styles.footer}>
        <div style={styles.backdrop} />
        
        {/* Top Bar */}
        <div style={{...styles.topBar, ...animationStyle(0)}}>
          <div style={styles.topDot}>
            <div style={{...styles.pulseRing, animation: "pulseRing 2s infinite"}} />
          </div>
          <span style={styles.topText}>BS Creation Studio</span>
        </div>

        {/* Main Grid */}
        <div style={styles.main}>
          {/* Brand */}
          <div style={{...styles.brand, ...animationStyle(1)}}>
            <div 
              style={styles.logoRow}
              onMouseEnter={(e) => e.currentTarget.style.animation = 'float 3s ease-in-out infinite'}
              onMouseLeave={(e) => e.currentTarget.style.animation = ''}
            >
              <div style={styles.logoIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M12 3L4 7v10l8 4 8-4V7L12 3z" stroke="#c8b99a" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M12 3v18M4 7l8 4 8-4" stroke="#c8b99a" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={styles.brandTitle}>
                BS <em style={styles.brandItalic}>Creation</em>
              </h2>
            </div>
            <p style={styles.brandDesc}>
              Crafting ideas into experiences. Where imagination meets execution, and vision becomes reality.
            </p>
            <div style={styles.badges}>
              <span style={styles.badgeGold}>
                <span style={styles.badgeDot} />
                Est. 2026
              </span>
              <span style={styles.badgeWhite}>Design Studio</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{...styles.divider, ...animationStyle(2)}} />

          {/* Navigate */}
          <div style={{...styles.col, ...animationStyle(3)}}>
            <h4 style={styles.colHeading}>Navigate</h4>
            <ul style={styles.colList}>
              {["Home", "Work", "About", "Contact"].map((item, index) => (
                <li key={item} style={{...styles.colItem, ...animationStyle(4 + index)}}>
                  <a
                    href="#"
                    style={{
                      ...styles.colLink,
                      color: hoveredLink === item ? "#c8b99a" : "rgba(255,255,255,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      setHoveredLink(item)
                      e.currentTarget.style.textShadow = "0 0 20px rgba(200,185,154,0.8)"
                      e.currentTarget.style.transform = "translateX(8px)"
                    }}
                    onMouseLeave={(e) => {
                      setHoveredLink(null)
                      e.currentTarget.style.textShadow = "none"
                      e.currentTarget.style.transform = "translateX(0)"
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div style={{...styles.col, ...animationStyle(8)}}>
            <h4 style={styles.colHeading}>Connect</h4>
            <ul style={styles.colList}>
              {["Instagram", "Twitter", "Behance", "LinkedIn"].map((item, index) => (
                <li key={item} style={{...styles.colItem, ...animationStyle(9 + index)}}>
                  <a
                    href="#"
                    style={{
                      ...styles.colLink,
                      color: hoveredLink === `connect-${item}` ? "#c8b99a" : "rgba(255,255,255,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      setHoveredLink(`connect-${item}`)
                      e.currentTarget.style.textShadow = "0 0 20px rgba(200,185,154,0.8)"
                      e.currentTarget.style.transform = "translateX(8px)"
                    }}
                    onMouseLeave={(e) => {
                      setHoveredLink(null)
                      e.currentTarget.style.textShadow = "none"
                      e.currentTarget.style.transform = "translateX(0)"
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gradient Separator */}
        <div style={{...styles.gradientLine, ...animationStyle(13)}} />

        {/* Bottom Bar */}
        <div style={{...styles.bottom, ...animationStyle(14)}}>
          <p style={styles.copy}>
            © 2026 <span style={styles.copyAccent}>BS Creation</span> — All rights reserved
            <span style={{ marginLeft: "1rem" }}>
              <a
                href="https://bscreation.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.websiteLink}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8b99a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                bscreation.com
              </a>
            </span>
          </p>
          <div style={styles.socials}>
            {Object.entries(socialIcons).map(([name, path], index) => (
              <button
                key={name}
                aria-label={name}
                style={{
                  ...styles.socialBtn,
                  ...animationStyle(15 + index),
                  ...(hoveredSocial === name && styles.socialBtnHover),
                }}
                onMouseEnter={() => setHoveredSocial(name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill={hoveredSocial === name ? "#c8b99a" : "rgba(255,255,255,0.5)"}
                >
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