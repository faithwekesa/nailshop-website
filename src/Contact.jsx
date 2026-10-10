import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    design: 'Modern Swirls Art',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const baseMessage = `Hello Frank's Nails, I would like to book an appointment.\n\n` +
      `• Name: ${formData.firstName} ${formData.lastName}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Set Style: ${formData.design}\n` +
      `• Message: ${formData.message || 'None'}`;
      
    const encodedMessage = encodeURIComponent(baseMessage);
    window.open(`https://wa.me{encodedMessage}`, '_blank');
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <style>{`
        .menu-link {
          color: #475569;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.25s ease;
        }
        .menu-link:hover {
          color: #db2777;
        }
        
        /* 🚀 STRCT CENTERING WRAPPER FORCING AUTOLAYOUT MIDDLE ALIGNMENT */
        .container-wrapper {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 60px 24px;
          flex-grow: 1;
          width: 100vw !important;
          box-sizing: border-box;
        }

        /* 🚀 RIGIDLY CENTERED AND EXPANDED LUXURY CARD */
        .luxury-booking-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -5px rgba(15, 23, 42, 0.08), 0 10px 20px -5px rgba(15, 23, 42, 0.04);
          border-radius: 24px;
          width: 100%;
          max-width: 616px;
          padding: 48px 44px;
          box-sizing: border-box;
          margin: 0 auto !important; /* Forces the browser to calculate even margins on both sides */
        }

        .form-row {
          display: flex;
          gap: 20px;
          width: 100%;
        }
        .form-col {
          flex: 1;
        }

        .input-group {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }
        .input-label {
          font-size: 14px;
          font-weight: 700;
          color: #000000;
          letter-spacing: 0.2px;
        }
        .form-input {
          width: 100%;
          padding: 16px;
          border: 1px solid #cbd5e1;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          box-sizing: border-box;
          color: #000000;
          background-color: #ffffff;
          transition: all 0.2s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: #db2777;
          box-shadow: 0 0 0 4px rgba(219, 39, 119, 0.1);
        }

        .submit-action-btn {
          width: 100%;
          background-color: #00875A;
          color: white;
          border: none;
          padding: 18px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-top: 12px;
          box-shadow: 0 4px 14px rgba(0, 135, 90, 0.3);
        }
        .submit-action-btn:hover {
          background-color: #00664F;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 135, 90, 0.45);
        }

        .btn-nav-book {
          background-color: #db2777;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-nav-book:hover {
          background-color: #be185d;
        }

        @media (max-width: 600px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
                {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        zIndex: 10
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '24px', fontWeight: '900', letterSpacing: '2px' }}>
          FRANK'S <span style={{ color: '#db2777' }}>NAILS</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <nav style={{ display: 'flex', gap: '36px', fontSize: '16px' }}>
            <Link to="/" className="menu-link">Home</Link>
            <Link to="/services" className="menu-link">Gallery</Link>
            <Link to="/contact" className="menu-link" style={{ color: '#db2777' }}>Contact</Link>
          </nav>
          <button className="btn-nav-book">Book Appointment</button>
        </div>
      </header>

      {/* Main Centered Content Viewport */}
      <main className="container-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
        <div className="luxury-booking-card">
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '32px', textAlign: 'left' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px 0', color: '#000000', letterSpacing: '-0.5px' }}>Book Appointment</h2>
              <p style={{ color: '#64748b', fontSize: '14.5px', margin: 0, fontWeight: '500', lineHeight: '1.5' }}>
                Fill your details below to submit your appointment request directly to Frank via WhatsApp.
              </p>
            </div>

            {/* Side-by-Side Name Row */}
            <div className="form-row">
              <div className="form-col input-group">
                <label className="input-label">First Name</label>
                <input type="text" name="firstName" required placeholder="e.g. Jane" value={formData.firstName} onChange={handleInputChange} className="form-input" />
              </div>
              <div className="form-col input-group">
                <label className="input-label">Last Name</label>
                <input type="text" name="lastName" required placeholder="e.g. Doe" value={formData.lastName} onChange={handleInputChange} className="form-input" />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input type="tel" name="phone" required placeholder="0712345678" value={formData.phone} onChange={handleInputChange} className="form-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Select Nail Design Set</label>
              <select name="design" value={formData.design} onChange={handleInputChange} className="form-input" style={{ cursor: 'pointer', appearance: 'none', backgroundPosition: 'right 16px center', backgroundRepeat: 'no-repeat', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")` }}>
                <option>Modern Swirls Art</option>
                <option>Signature French Tip</option>
                <option>Luxury Sculpted Stilettos</option>
                <option>Floral Almond Inlays</option>
                <option>Wine Red Gloss Sets</option>
                <option>Classic Crimson Accent</option>
                <option>Minimalist Line Art</option>
                <option>Waterfall Ombré Drop</option>
                <option>Red French Luxe</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Additional Instructions / Message</label>
              <textarea name="message" rows="4" placeholder="Preferred time, shape specifications, or custom length requests..." value={formData.message} onChange={handleInputChange} className="form-input" style={{ resize: 'none' }} />
            </div>

            <button type="submit" className="submit-action-btn">
              Book via WhatsApp
            </button>
          </form>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '28px', fontSize: '14px', color: '#64748b', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontWeight: '500', width: '100%', boxSizing: 'border-box' }}>
        © {new Date().getFullYear()} Frank's Nails. All rights reserved.
      </footer>
    </div>
  );
}

