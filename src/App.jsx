import React from 'react';

export default function App() {
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
      {/* Luxury Brand Styling Engine */}
      <style>{`
        .nav-link {
          color: #f1f5f9 !important;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.25s ease;
        }
        .nav-link:hover {
          color: #f472b6 !important;
          transform: translateY(-1px);
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

        .btn-primary:hover {
          background-color: #be185d;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(190, 24, 93, 0.6);
        }

        .btn-nav-book {
          background-color: #ffffff;
          color: #0f172a;
          border: none;
          padding: 10px 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .btn-nav-book:hover {
          background-color: #db2777;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(219, 39, 119, 0.4);
        }

        .luxury-gradient-text {
          background: linear-gradient(135deg, #ff94c2 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Full-Screen Hero Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/french manicure/modernswirls.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
      }} />
      
      {/* Opacity Tint Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(11, 15, 26, 0.68)',
        zIndex: 2
      }} />

      {/* Navigation Header */}
      <header style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '28px 48px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '2px' }}>
          FRANK'S <span style={{ color: '#db2777' }}>NAILS</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <nav style={{ display: 'flex', gap: '36px', fontSize: '16px' }}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <button className="btn-nav-book">
            Book Appointment
          </button>
        </div>
      </header>

      {/* Hero Content Section */}
      <main style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        maxWidth: '850px',
        margin: 'auto',
        boxSizing: 'border-box'
      }}>
        {/* 🛠️ FIXED: Completely Colorless Location Tag with a Sleek Transparent Border */}
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
          marginBottom: '28px'
        }}>
          Kahawa Wendani, Nairobi
        </div>

        {/* Typography Headline */}
        <h1 style={{
          fontSize: '82px',
          fontWeight: '900',
          lineHeight: '1.05',
          margin: '0 0 24px 0',
          letterSpacing: '-2px',
          color: '#ffffff',
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))'
        }}>
          Bold nails.<br />
          <span className="luxury-gradient-text">Beautifully done.</span>
        </h1>

        {/* Subtitle Paragraph */}
        <p style={{
          color: '#e2e8f0',
          fontSize: '21px',
          lineHeight: '1.6',
          maxWidth: '680px',
          margin: '0 0 44px 0',
          fontWeight: '400',
          letterSpacing: '0.2px',
          filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))'
        }}>
          Stilettos, French tips, florals and custom nail art, finished by hand to match your style.
        </p>

        {/* Interactive Action Buttons */}
        <div className="button-group" style={{ display: 'flex', gap: '20px' }}>
          <button className="btn-primary">
            Explore Services
          </button>
          <button className="btn-contact">
            Contact Frank
          </button>
        </div>
      </main>

      {/* Footer */}
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
