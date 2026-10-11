import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Services from './Services';
import Contact from './Contact';

function HeroHome() {
  const navigate = useNavigate();
  
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      fontFamily: 'sans-serif',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <style>{`
        .nav-link {
          color: #f1f5f9 !important;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 0.5px;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          font-size: 16px;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: #f472b6 !important;
        }
        
        .home-brand-header {
          position: relative;
          z-index: 3;
          display: flex !important;
          flex-direction: row !important;
          justify-content: space-between !important;
          align-items: center !important;
          padding: 28px 48px;
          width: 100%;
          box-sizing: border-box;
        }
        .home-header-navigation {
          display: flex !important;
          flex-direction: row !important;
          gap: 36px !important;
          align-items: center !important;
        }
        .brand-logo-text {
          text-decoration: none;
          color: white;
          font-size: 26px;
          font-weight: 900;
          letter-spacing: 2px;
          line-height: 1.2;
          white-space: nowrap;
        }

        .btn-primary {
          background-color: #db2777;
          color: white;
          border: none;
          padding: 14px 34px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(219, 39, 119, 0.4);
        }
        .btn-primary:hover {
          background-color: #be185d;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(190, 24, 93, 0.6);
        }
        .btn-contact {
          background-color: #ffffff;
          color: #db2777;
          border: 2px solid #ffffff;
          padding: 12px 32px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }
        .button-group:has(.btn-contact:hover) .btn-primary {
          background-color: #ffffff;
          color: #db2777;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }
        .button-group:has(.btn-contact:hover) .btn-contact {
          background-color: #db2777;
          color: #ffffff;
          border-color: #db2777;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(219, 39, 119, 0.5);
        }
        .luxury-gradient-text {
          background: linear-gradient(135deg, #ff94c2 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 680px) {
          .home-brand-header {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 16px 16px !important;
          }
          .brand-logo-text {
            font-size: 18px !important;
            letter-spacing: 1px !important;
          }
          .home-header-navigation {
            gap: 12px !important;
          }
          .nav-link {
            font-size: 13.5px !important;
          }
          .contact-link-btn {
            padding: 6px 14px !important;
            font-size: 13px !important;
          }
        }
      `}</style>

      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/french manicure/modernswirls.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
      }} />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(11, 15, 26, 0.68)',
        zIndex: 2
      }} />

      <header className="home-brand-header">
        <Link to="/" className="brand-logo-text">
          FRANK'S <span style={{ color: '#db2777' }}>NAILS</span>
        </Link>
        <div>
          <nav className="home-header-navigation">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/services" className="nav-link">Gallery</Link>
            <Link to="/contact" className="nav-link contact-link-btn" style={{ background: '#db2777', color: 'white !important', padding: '10px 24px', borderRadius: '9999px', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center' }}>Contact</Link>
          </nav>
        </div>
      </header>
      <main style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        maxWidth: '850px',
        margin: 'auto',
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#f472b6',
          padding: '7px 20px',
          borderRadius: '9999px',
          fontSize: '13px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '24px'
        }}>
          Kahawa Wendani, Nairobi
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 8vw, 82px)',
          fontWeight: '900',
          lineHeight: '1.1',
          margin: '0 0 20px 0',
          letterSpacing: '-1px',
          color: '#ffffff',
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))'
        }}>
          Bold nails.<br />
          <span className="luxury-gradient-text">Beautifully done.</span>
        </h1>

        <p style={{
          color: '#e2e8f0',
          fontSize: 'clamp(15px, 4vw, 21px)',
          lineHeight: '1.5',
          maxWidth: '680px',
          margin: '0 0 36px 0',
          fontWeight: '400',
          letterSpacing: '0.2px',
          filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))'
        }}>
          Stilettos, French tips, florals and custom nail art, finished by hand to match your style.
        </p>

        <div className="button-group" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => navigate('/services')}>
            Explore Services
          </button>
          <button className="btn-contact" onClick={() => navigate('/contact')}>
            Contact Frank
          </button>
        </div>
      </main>

      <footer style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        padding: '24px',
        fontSize: '14px',
        color: '#94a3b8',
        fontWeight: '500'
      }}>
        © {new Date().getFullYear()} Frank's Nails. All rights reserved.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroHome />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

