import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@google/model-viewer'; 
import Navbar from './Navbar';

const Open = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div style={styles.pageWrapper}>
        <div style={styles.hero}>
          <h1 style={styles.title}>🎯 Welcome to <span style={styles.highlight}>DartCounter</span>!</h1>
          <p style={styles.subtitle}>Look around the dart board!</p>

          {/* Model Viewer */}
          <model-viewer 
            src="/models/tabla.glb"
            alt="360 fokos darts tábla"
            auto-rotate
            camera-controls
            style={styles.model}
          />

          
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>Powered by DartCounter</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { 
    backgroundColor: '#121212', // Sötét háttér
    color: '#fff', // Fehér szöveg
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px',
    textAlign: 'center',
    fontFamily: `'Roboto', sans-serif`, // Egyedi betűtípus
    background: 'linear-gradient(135deg, rgba(18, 18, 18, 1) 0%, rgba(0, 0, 0, 0.8) 100%)',
  },
  hero: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 1s ease-out',
  },
  title: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1B3F1B', // Updated color
    letterSpacing: '2px',
    textShadow: '0 0 15px #1B3F1B, 0 0 30px #1B3F1B, 0 0 50px #1B3F1B', // Updated color
    animation: 'glow 2s infinite alternate', // Fényes hatás animáció
  },
  highlight: { 
    color: '#1B3F1B' // Updated color
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#BDC3C7', // Világosszürke szöveg
    letterSpacing: '1px',
  },
  model: {
    width: '100%',
    maxWidth: '500px',
    height: '500px',
    marginBottom: '40px',
    boxShadow: '0px 0px 20px rgba(27, 63, 27, 0.7)', // Updated shadow color
    transition: 'transform 0.5s ease-in-out',
  },
  button: {
    padding: '14px 40px',
    fontSize: '18px',
    backgroundColor: '#1B3F1B', // Updated background color
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxShadow: '0 0 15px rgba(27, 63, 27, 0.7)', // Updated shadow color
    animation: 'pulse 2s infinite ease-in-out', // Animáció
  },
  buttonHover: {
    backgroundColor: '#2C5A2C', // Slightly darker green for hover
    boxShadow: '0 0 20px rgba(27, 63, 27, 0.9)', // Updated shadow color
  },

  footerText: {
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center',
    color: '#BDC3C7', // Világosszürke szöveg
  },
};

// Animációk a CSS-ben
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes glow {
    0% { text-shadow: 0 0 15px #1B3F1B, 0 0 30px #1B3F1B, 0 0 50px #1B3F1B; }
    50% { text-shadow: 0 0 25px #1B3F1B, 0 0 60px #1B3F1B, 0 0 100px #1B3F1B; }
    100% { text-shadow: 0 0 15px #1B3F1B, 0 0 30px #1B3F1B, 0 0 50px #1B3F1B; }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`, styleSheet.cssRules.length);

export default Open;
