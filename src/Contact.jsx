import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    design: 'Modern Swirls Art',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  },);

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
    window.open(`https://whatsapp.com{encodedMessage}`, '_blank');
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
          color: #000000;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.25s ease;
          display: flex;
          align-items: center;
        }
        .menu-link:hover {
          color: #db2777;
        }
        
        .nav-link-contact-highlight {
          background-color: #db2777;
          color: #ffffff !important;
          padding: 10px 24px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(219, 39, 119, 0.2);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
        }
        .nav-link-contact-highlight:hover {
          background-color: #be185d;
          color: #ffffff !important;
          transform: translateY(-1px);
        }
        
        .container-wrapper {
          display: flex !important;
          justifyContent: center !important;
          align-items: center !important;
          padding: 60px 24px;
          flex-grow: 1;
          width: 100vw !important;
          box-sizing: border-box;
        }

        .luxury-booking-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -5px rgba(15, 23, 42, 0.08), 0 10px 20px -5px rgba(15, 23, 42, 0.04);
          border-radius: 24px;
          width: 100%;
          max-width: 616px;
          padding: 48px 44px;
          box-sizing: border-box;
          margin: 0 auto !important;
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

        .form-input::placeholder {
          color: #94a3b8 !important;
          font-weight: 400 !important;
          font-size: 13.5px !important;
          font-style: italic !important;
          opacity: 0.85;
        }

        .submit-action-btn {
          width: 100%;
          background-color: #db2777;
          color: white;
          border: none;
          padding: 18px;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-top: 12px;
          box-shadow: 0 4px 14px rgba(219, 39, 119, 0.3);
        }
        .submit-action-btn:hover {
          background-color: #be185d;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(190, 24, 93, 0.45);
        }

        .call-link {
          font-size: 20px;
          font-weight: 900;
          color: #000000;
          text-decoration: none;
          transition: color 0.2s;
        }
        .call-link:hover {
          color: #db2777;
        }

        .contact-brand-header {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          padding: 24px 64px;
          width: 100%;
          box-sizing: border-box;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          position: relative;
          z-index: 10;
        }
        .contact-header-navigation {
          display: flex !important;
          flex-direction: row !important;
          gap: 40px !important;
          align-items: center !important;
          font-size: 16px;
        }

        @media (max-width: 680px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          .contact-brand-header {
            flex-direction: column !important;
            gap: 16px !important;
            padding: 20px 24px !important;
            text-align: center;
          }
          .contact-header-navigation {
            gap: 24px !important;
            justify-content: center !important;
            width: 100%;
          }
        }
      `}</style>
            <header className="contact-brand-header">
        <Link to="/" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '24px', fontWeight: '900', letterSpacing: '2px', lineHeight: '1.2' }}>
          FRANK'S <span style={{ color: '#db2777' }}>NAILS</span>
        </Link>
        <div>
          <nav className="contact-header-navigation">
            <Link to="/" className="menu-link">Home</Link>
            <Link to="/services" className="menu-link">Gallery</Link>
            <Link to="/contact" className="menu-link nav-link-contact-highlight">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container-wrapper">
        <div className="luxury-booking-card">
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '32px', textAlign: 'left' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px 0', color: '#000000', letterSpacing: '-0.5px' }}>Book Appointment</h2>
              <p style={{ color: '#000000', fontSize: '14.5px', margin: 0, fontWeight: '700', lineHeight: '1.5' }}>
                Fill your details below to submit your appointment request directly to Frank via WhatsApp.
              </p>
            </div>

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
              <select name="design" value={formData.design} onChange={handleInputChange} className="form-input" style={{ cursor: 'pointer', appearance: 'none', backgroundPosition: 'right 16px center', backgroundRepeat: 'no-repeat', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")` }}>
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
              Reach out to Frank on WhatsApp
            </button>

            <div style={{ textAlign: 'center', marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <p style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1.5px', margin: '0 0 6px 0' }}>
                Or Call Frank Directly
              </p>
              <a href="tel:+254712077837" className="call-link">
                0712 077 837
              </a>
            </div>
          </form>

        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '28px', fontSize: '14px', color: '#000000', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontWeight: '700', width: '100%', boxSizing: 'border-box' }}>
        © {new Date().getFullYear()} Frank's Nails. All rights reserved.
      </footer>
    </div>
  );
}

